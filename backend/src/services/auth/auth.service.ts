import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';

@Injectable()
export class AuthService {
  async createUser({
    username,
    password,
  }: RegisterInput): Promise<{ success: boolean }> {
    return { success: true };
  }

  async login({
    username,
    password,
  }: LoginInput): Promise<{ success: boolean }> {
    return { success: true };
  }
}
