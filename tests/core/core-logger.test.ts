import { describe, it, expect } from 'vitest';

// Importamos nossos mocks EXPORTADOS do arquivo de setup.
// Isso garante que estamos testando as funções espiãs corretas.
import { pinoFactoryMock, pinoInstanceMock } from '../setup';

import { CoreLogger } from '../../src/core/core-logger';
import { LogLevelEnum } from '../../src/enums/log-level.enum';

describe('Src :: Core :: CoreLogger', () => {
  describe('Constructor', () => {
    it('should initialize pino with "info" level by default', () => {
      new CoreLogger();

      expect(pinoFactoryMock).toHaveBeenCalledWith({ level: 'info' });
    });

    it('should initialize pino with the specified log level', () => {
      new CoreLogger({ level: LogLevelEnum.WARN });

      expect(pinoFactoryMock).toHaveBeenCalledWith({ level: 'warn' });
    });

    it('should configure "pino-pretty" transport if the option is true', () => {
      new CoreLogger({ prettyPrint: true });

      expect(pinoFactoryMock).toHaveBeenCalledWith({ level: 'info' }, expect.objectContaining({ target: 'pino-pretty' }));
    });
  });

  describe('Logging Methods', () => {
    it('should call pino.info with the correct message and data', () => {
      const logger = new CoreLogger();
      logger.info('User logged in', { userId: 1 });
      expect(pinoInstanceMock.info).toHaveBeenCalledWith({ userId: 1 }, 'User logged in');
    });

    it('should call pino.error with the correct message and data', () => {
      const logger = new CoreLogger();
      logger.error('DB connection failed', { code: 500 });
      expect(pinoInstanceMock.error).toHaveBeenCalledWith({ code: 500 }, 'DB connection failed');
    });

    it('should call pino.warn with the correct message and data', () => {
      const logger = new CoreLogger();
      logger.warn('Disk space is low', { freeSpace: '10%' });
      expect(pinoInstanceMock.warn).toHaveBeenCalledWith({ freeSpace: '10%' }, 'Disk space is low');
    });

    it('should call pino.debug with the correct message and data', () => {
      const logger = new CoreLogger();
      logger.debug('Request payload', { body: { user: 'test' } });
      expect(pinoInstanceMock.debug).toHaveBeenCalledWith({ body: { user: 'test' } }, 'Request payload');
    });

    it('should call pino.trace with the correct message and data', () => {
      const logger = new CoreLogger();
      logger.trace('Entering function X', { function: 'processData' });
      expect(pinoInstanceMock.trace).toHaveBeenCalledWith({ function: 'processData' }, 'Entering function X');
    });

    it('should call pino.fatal with the correct message and data', () => {
      const logger = new CoreLogger();
      logger.fatal('Critical system failure', { service: 'auth' });
      expect(pinoInstanceMock.fatal).toHaveBeenCalledWith({ service: 'auth' }, 'Critical system failure');
    });
  });
});
