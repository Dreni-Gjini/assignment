import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterInput {
  @ApiProperty({
    description: 'The username of the user',
    example: 'johndoe',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description:
      'The password of the user. Must be at least 8 characters long.',
    example: 'strongPassword123',
    minLength: 8,
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
