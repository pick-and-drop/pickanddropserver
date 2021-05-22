import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PostgresConfigService {
  constructor(private configService: ConfigService) {}

  get user(): string {
    return this.configService.get<string>('DATABASE_USER');
  }

  get password(): string {
    return this.configService.get<string>('DATABASE_PASSWORD');
  }

  get name(): string {
    return this.configService.get<string>('DATABASE_NAME');
  }

  get host(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }

  get port(): number {
    return this.configService.get<number>('DATABASE_PORT');
  }
}
