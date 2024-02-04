import extract from '@app_config/validate-env';
import { registerAs } from '@nestjs/config';
import { IsEnum, IsNumber, IsPositive, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export interface IMiscConfig {
  nodeVersion: string;
  nodeEnv: NodeEnv;
  port: number;
}

enum NodeEnv {
  development,
  production,
}

class MiscEnv {
  @Expose()
  @IsString()
  NODE_VERSION: string;

  @Expose()
  @IsString()
  @IsEnum(NodeEnv)
  NODE_ENV: string;

  @Expose()
  @IsNumber()
  @IsPositive()
  BACKEND_PORT: number;
}

export const miscConfig = registerAs('miscConfig', (): IMiscConfig => {
  const config = extract(MiscEnv);
  return {
    nodeVersion: config.NODE_VERSION,
    nodeEnv: NodeEnv[config.NODE_ENV],
    port: config.BACKEND_PORT,
  };
});
