import { UserOutput } from '../dto/user.output';

export class Token {
  accessToken: string;

  user: UserOutput;

  //In a real world app we would have also refresh tokens..
  //   refreshToken: string;
}
