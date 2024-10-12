import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({
    description: 'The message content',
    example: 'Hi, can you help me?',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
