import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { CoreLogger } from '../core/core-logger';
import { LoggerOptions } from '../interfaces/logger-options.interface';
import { NestLoggerAdapter } from '../nest/nest-logger.adapter';

@Global()
@Module({})
export class LoggerModule {
  static forRoot(options: LoggerOptions = {}): DynamicModule {
    const providers: Provider[] = [
      {
        provide: CoreLogger,
        useValue: new CoreLogger(options),
      },
      NestLoggerAdapter,
    ];

    return {
      module: LoggerModule,
      providers: providers,
      exports: providers,
    };
  }
}
