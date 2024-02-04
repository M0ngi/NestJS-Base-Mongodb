import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@app_config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "*"
  })

  const configService = app.get(ConfigService);
  const PORT = configService.getMiscConfig().port;

  await app.listen(PORT);
}
bootstrap();
