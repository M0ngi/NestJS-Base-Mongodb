import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from '@app_config/config.module';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { ConfigService } from '@app_config/config.service';

@Module({
  imports: [
    AppConfigModule,
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<MongooseModuleFactoryOptions> => ({
        ...configService.getDatabaseConfig(),
      }),
      connectionName: 'default',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
