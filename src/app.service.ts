import { Injectable } from '@nestjs/common';
import { ApiConfigService } from './api-config.service';

@Injectable()
export class AppService {
  constructor(private apiConfigService: ApiConfigService) {
    if (apiConfigService.isAuthEnabled) {
      console.log('auth enabled');
    } else {
      console.log('auth disabled');
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
