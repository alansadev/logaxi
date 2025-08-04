import { LogLevelEnum } from '../enums/log-level.enum';

export interface LoggerOptions {
  level?: LogLevelEnum;
  prettyPrint?: boolean;
}
