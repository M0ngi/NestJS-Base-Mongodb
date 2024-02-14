import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@app_config/config.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "*"
  })
  app.useGlobalPipes(new ValidationPipe({
    stopAtFirstError: true,
    forbidUnknownValues: true,
    forbidNonWhitelisted: true,
    transform: true,
    whitelist: true,
  }));

  const configService = app.get(ConfigService);
  const PORT = configService.getMiscConfig().port;

  await app.listen(PORT);
}
bootstrap();
