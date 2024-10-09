import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginInput {
  @ApiProperty({ example: 'johndoe', description: 'The username of the user' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'The password of the user',
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
