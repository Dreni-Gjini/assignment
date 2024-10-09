import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterInput } from './dto/register.input';
import { User } from 'src/user/entities/user.entity';
import { Token } from './entities/token.entity';
import { LoginInput } from './dto/login.input';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad request, invalid input' })
  register(@Body() registerInput: RegisterInput): Promise<Token> {
    return this.authService.createUser(registerInput);
  }

  @Post('/login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 201, description: 'Login successful' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, invalid credentials',
  })
  login(@Body() loginInput: LoginInput): Promise<Token> {
    return this.authService.login(loginInput);
  }
}
