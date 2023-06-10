import { Injectable, Inject } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { databaseConfig } from 'src/database.config';

@Injectable()
export class CatsService {
  private cats: Array<string> = ['jim the cat', 'bob the cat'];

  constructor(
    private configService: ConfigService,
    @Inject(databaseConfig.KEY)
    private dbConfig: ConfigType<typeof databaseConfig>,
  ) {}

  findAll(): Array<string> {
    console.log(
      "here's the NODE_ENV from this.configService.get('NODE_ENV'): ",
      this.configService.get('NODE_ENV'),
    );
    console.log(
      "here's the database user from an injected param dbConfig using databaseConfig.key and \nConfigType<typeof databaseConfig>: ",
      this.dbConfig.user,
    );
    console.log(
      "here's the auth_enabled from an injected param dbConfig using databaseConfig.key and \nConfigType<typeof databaseConfig>: ",
      typeof this.dbConfig.auth_enabled,
      this.dbConfig.auth_enabled,
    );
    console.log(
      "notice that auth_enabled from injected param dbConfig is not boolean true, even \nthough this.configService.get('AUTH_ENABLED') is boolean true: ",
      typeof this.configService.get('AUTH_ENABLED'),
      this.configService.get('AUTH_ENABLED'),
    );
    /**
     * for env variable expansion to work, we must set the expandVariables property to true
     * within the ConfigModule.forRoot() method's configuration object
     */
    console.log(
      'expanded env variables: ',
      this.configService.get('EXPANDED_AUTH_ENABLED'),
    );
    return this.cats;
  }
}
