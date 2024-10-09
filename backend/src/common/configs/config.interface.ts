export interface Config {
  nest: NestConfig;
  cors: CorsConfig;
  security: SecurityConfig;
}

export interface NestConfig {
  port: number;
}

export interface CorsConfig {
  enabled: boolean;
}

export interface SecurityConfig {
  expiresIn: string;
  bcryptSaltOrRound: string | number;
}
