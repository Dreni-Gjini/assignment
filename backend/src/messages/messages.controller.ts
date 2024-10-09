import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { JwtAuthGuard } from 'src/services/auth/jwt-auth.guard';
import { User } from 'src/user/entities/user.entity';
import { UserEntity } from 'src/common/decorators/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto, @UserEntity() user: User) {
    return this.messagesService.createMessage(createMessageDto, user.id);
  }

  @Get()
  findAll() {
    return this.messagesService.getAllMessages();
  }
}
