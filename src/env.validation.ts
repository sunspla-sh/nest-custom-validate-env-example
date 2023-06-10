import { plainToInstance, Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsString,
  validateSync,
} from 'class-validator';

/**
 * Define enum for possible NODE_ENV values
 */
enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

/**
 * Define class with validation decorators for all env variables
 */
class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  PORT: number;

  @IsString()
  DATABASE_USER: string;

  @IsString()
  DATABASE_PASSWORD: string;

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  AUTH_ENABLED: boolean;
}

/**
 * Define synchronous validate function (nestjs docs seem to specify that it must be synchronous) which attempts to validate
 * our env variables that have been merged into process.env object. If this function throws an error, it will prevent
 * the application from bootstrapping.
 */
export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    /**
     * Dont set this to true it will screw with our string "true" and string "false" values and not
     * properly convert them to boolean true and boolean false like we want because "false" as a string is technically boolean true
     * because it has a length greater than zero.
     */
    // enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
