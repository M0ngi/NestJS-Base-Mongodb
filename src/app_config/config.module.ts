import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';
import * as configs from '@app_config/configs/index';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        '.env.local',
        '.env',
        '.env.development.local',
        '.env.development',
      ],
      load: Object.keys(configs).map((key) => configs[key]),
      expandVariables: true,
      cache: true,
    })
  ],
  exports: [ConfigService],
  providers: [ConfigService],
})
export class AppConfigModule {
}
