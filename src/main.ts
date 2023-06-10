import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**
   * Here we're using app.get() in main.ts to retrieve the instance of ConfigService
   * so that we can use the configService.get() method to retrieve
   * the port env variable.
   */
  const configService = app.get(ConfigService);
  const port = parseInt(configService.get<string>('PORT'));
  await app.listen(port);
}
bootstrap();
