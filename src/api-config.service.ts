import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get isAuthEnabled(): boolean {
    console.log(
      typeof this.configService.get('AUTH_ENABLED'),
      this.configService.get('AUTH_ENABLED'),
    );
    return this.configService.get('AUTH_ENABLED') === true;
  }
}
