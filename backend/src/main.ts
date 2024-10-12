import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
import * as YAML from 'yaml';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Chat Messenger API')
    .setDescription('API documentation for Chat Messenger')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const openApiStructure = {
    openapi: '3.0.0',
    info: {
      title: 'Chat Messenger API',
      description: 'API documentation for Chat Messenger',
      version: '1.0.0',
    },
    paths: document.paths || {},
    components: document.components || {},
    tags: document.tags || [],
    servers: document.servers || [],
  };

  const yamlString = YAML.stringify(openApiStructure);

  SwaggerModule.setup('api', app, document);

  const docFolderPath = path.resolve(__dirname, '../../docs');
  const docFilePath = path.join(docFolderPath, 'openapi.yaml');

  if (!fs.existsSync(docFolderPath)) {
    fs.mkdirSync(docFolderPath, { recursive: true });
  }

  fs.writeFileSync(docFilePath, yamlString);

  await app.listen(3000);
}

bootstrap();
