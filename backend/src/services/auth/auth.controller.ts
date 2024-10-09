import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad request, invalid input' })
  register(@Body() signupInput: RegisterInput): Promise<{ success: boolean }> {
    return this.authService.createUser(signupInput);
  }

  @Post('/login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 201, description: 'Login successful' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, invalid credentials',
  })
  login(@Body() loginInput: LoginInput): Promise<{ success: boolean }> {
    return this.authService.login(loginInput);
  }
}
