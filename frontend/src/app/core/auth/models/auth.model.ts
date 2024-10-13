interface User {
  id: string;
  username: string;
}

export interface AuthApiResponse {
  accessToken: string;
  user: User;
}

export interface JwtPayload {
  exp: number;
  iat: number;
  userId: string;
}
