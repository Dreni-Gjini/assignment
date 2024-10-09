import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { Token } from './entities/token.entity';
import { RegisterInput } from './dto/register.input';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { UserOutput } from './dto/user.output';
import { LoginInput } from './dto/login.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    private readonly usersService: UserService,
  ) {}

  async createUser({ username, password }: RegisterInput): Promise<Token> {
    const hashedPassword = await this.passwordService.hashPassword(password);

    try {
      const user = this.usersService.addUser({
        username,
        password: hashedPassword,
        id: crypto.randomUUID(),
      }) as unknown as User;

      return this.generateTokens(user);
    } catch (e) {
      if (this.usersService.checkUsernameDuplication(username))
        throw new ConflictException(`Username ${username} already used.`);
    }
  }

  async login({ username, password }: LoginInput): Promise<Token> {
    const user = this.usersService.getUserByUsername(username);

    if (!user) {
      throw new NotFoundException(`No user found for username: ${username}`);
    }

    const passwordValid = await this.passwordService.validatePassword(
      password,
      user.password,
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    return this.generateTokens(user);
  }

  async validateUser(userId: string): Promise<User> {
    return this.usersService.getUserById(userId);
  }

  async getUserFromToken(token: string): Promise<User> {
    const id = this.jwtService.decode(token)['userId'];
    return this.usersService.getUserById(id);
  }

  generateTokens(user: User): Token {
    const userOutput: UserOutput = {
      id: user.id,
      username: user.username,
    };
    return {
      accessToken: this.generateAccessToken({ userId: user.id }),
      user: userOutput,
    };
  }

  private generateAccessToken(payload: { userId: string }): string {
    return this.jwtService.sign(payload);
  }
}
