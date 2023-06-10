import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { validate } from './env.validation';
import { databaseConfig } from './database.config';
import { ApiConfigService } from './api-config.service';

@Module({
  imports: [
    CatsModule,
    ConfigModule.forRoot({
      load: [databaseConfig],
      validate,
      isGlobal: true,
      expandVariables: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ApiConfigService],
})
export class AppModule {}
