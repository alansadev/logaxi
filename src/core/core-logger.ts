import pino, { Logger as PinoLogger, transport } from 'pino';
import { LoggerOptions } from '../interfaces/logger-options.interface';
import { LogLevelEnum } from '../enums/log-level.enum';

export class CoreLogger {
  private readonly pinoInstance: PinoLogger;
  constructor(options?: LoggerOptions) {
    const loggerOptions = { level: options?.level || LogLevelEnum.INFO };

    if (options?.prettyPrint) {
      const prettyTransport = transport({
        target: 'pino-pretty',
        options: {
          colorize: true,
          levelFirst: true,
          translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
        },
      });
      this.pinoInstance = pino(loggerOptions, prettyTransport);
    } else {
      this.pinoInstance = pino(loggerOptions);
    }
  }

  public debug(message: string, data?: Record<string, any>): void {
    this.pinoInstance.debug(data, message);
  }

  public error(message: string, data?: Record<string, any>): void {
    this.pinoInstance.error(data, message);
  }

  public fatal(message: string, data?: Record<string, any>): void {
    this.pinoInstance.fatal(data, message);
  }

  public info(message: string, data?: Record<string, any>): void {
    this.pinoInstance.info(data, message);
  }

  public trace(message: string, data?: Record<string, any>): void {
    this.pinoInstance.trace(data, message);
  }

  public warn(message: string, data?: Record<string, any>): void {
    this.pinoInstance.warn(data, message);
  }
}
