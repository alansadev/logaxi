import { Injectable, LoggerService } from '@nestjs/common';
import { CoreLogger } from '../core/core-logger';

@Injectable()
export class NestLoggerAdapter implements LoggerService {
  constructor(public readonly coreLogger: CoreLogger) {}

  private parseParameters(params: any[]): {
    context?: string;
    data: Record<string, any>;
  } {
    let context: string | undefined;
    const data: Record<string, any> = {};

    if (typeof params[params.length - 1] === 'string') {
      context = params.pop();
    }

    params.forEach(param => {
      if (typeof param === 'object' && param !== null) {
        Object.assign(data, param);
      }
    });

    return { context, data };
  }

  log(message: string, ...optionalParams: any[]) {
    const { context, data } = this.parseParameters(optionalParams);
    this.coreLogger.info(message, { ...data, context });
  }

  error(message: string, ...optionalParams: any[]) {
    const trace = typeof optionalParams[0] === 'string' ? optionalParams.shift() : undefined;
    const { context, data } = this.parseParameters(optionalParams);
    this.coreLogger.error(message, { ...data, context, trace });
  }

  warn(message: string, ...optionalParams: any[]) {
    const { context, data } = this.parseParameters(optionalParams);
    this.coreLogger.warn(message, { ...data, context });
  }

  debug(message: string, ...optionalParams: any[]) {
    const { context, data } = this.parseParameters(optionalParams);
    this.coreLogger.debug(message, { ...data, context });
  }

  verbose(message: string, ...optionalParams: any[]) {
    const { context, data } = this.parseParameters(optionalParams);
    this.coreLogger.trace(message, { ...data, context });
  }
}
