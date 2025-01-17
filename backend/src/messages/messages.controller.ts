import { Controller, Post, Get, Body, UseGuards, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { User } from '../user/entities/user.entity';
import { JwtAuthGuard } from 'src/services/auth/jwt-auth.guard';
import { UserEntity } from 'src/common/decorators/user.decorator';

@ApiTags('Messages')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @ApiOperation({ summary: 'Create a new message' })
  @ApiResponse({ status: 201, description: 'Message created successfully' })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error during message creation',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiOperation({
    summary: 'Send a message',
    operationId: 'send',
  })
  @Post()
  create(@Body() createMessageDto: CreateMessageDto, @UserEntity() user: User) {
    return this.messagesService.createMessage(createMessageDto, user.id);
  }

  @ApiOperation({ summary: 'Retrieve all messages for the user' })
  @ApiResponse({ status: 200, description: 'Messages retrieved successfully' })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error during message retrieval ',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({
    summary: 'Retrieve all messages',
    operationId: 'findAll',
  })
  @Get()
  findAll(@UserEntity() user: User, @Query('timestamp') timestamp: string) {
    const lastFetched = new Date(Number(timestamp));
    return this.messagesService.getAllMessages(user.id, lastFetched);
  }
}
