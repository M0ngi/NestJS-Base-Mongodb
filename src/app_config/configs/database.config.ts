import extract from '@app_config/validate-env';
import { registerAs } from '@nestjs/config';
import { IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

export interface IDatabaseConfig extends MongooseModuleFactoryOptions { }

class DatabaseEnv {
  @Expose()
  @IsString()
  @IsNotEmpty()
  MONGO_USERNAME: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  MONGO_PASSWORD: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  MONGO_HOST: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  MONGO_URI: string;
}

export const databaseConfig = registerAs('databaseConfig', (): IDatabaseConfig => {
  const config = extract(DatabaseEnv);
  return {
    uri: config.MONGO_URI,
  };
});
