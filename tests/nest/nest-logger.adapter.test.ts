import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NestLoggerAdapter } from '../../src/nest/nest-logger.adapter';
import { CoreLogger } from '../../src/core/core-logger';

const mockCoreLogger = {
  info: vi.fn(),
  error: vi.fn(),
  warn: vi.fn(),
  debug: vi.fn(),
  trace: vi.fn(),
  fatal: vi.fn(),
};

describe('Src :: Nest :: NestLoggerAdapter', () => {
  let adapter: NestLoggerAdapter;

  beforeEach(() => {
    vi.clearAllMocks();
    adapter = new NestLoggerAdapter(mockCoreLogger as unknown as CoreLogger);
  });

  describe('log() method', () => {
    it('should call coreLogger.info with the message and context', () => {
      adapter.log('User logged in', 'AuthContext');
      expect(mockCoreLogger.info).toHaveBeenCalledWith('User logged in', {
        context: 'AuthContext',
      });
    });

    it('should call coreLogger.info, merging extra data objects', () => {
      adapter.log('User logged in', { userId: 123 }, { tenantId: 'abc' }, 'AuthContext');
      expect(mockCoreLogger.info).toHaveBeenCalledWith('User logged in', {
        userId: 123,
        tenantId: 'abc',
        context: 'AuthContext',
      });
    });
  });

  describe('error() method', () => {
    it('should call coreLogger.error with message, context, and trace', () => {
      adapter.error('An error occurred', 'stack-trace-here', 'ErrorContext');
      expect(mockCoreLogger.error).toHaveBeenCalledWith('An error occurred', {
        trace: 'stack-trace-here',
        context: 'ErrorContext',
      });
    });

    it('should call coreLogger.error, merging extra data objects along with trace', () => {
      adapter.error('An error occurred', 'stack-trace-here', { requestId: 'xyz' }, 'ErrorContext');
      expect(mockCoreLogger.error).toHaveBeenCalledWith('An error occurred', {
        requestId: 'xyz',
        trace: 'stack-trace-here',
        context: 'ErrorContext',
      });
    });
    it('should handle calls without a stack trace string', () => {
      adapter.error('Validation failed', { field: 'email' }, 'ValidationContext');
      expect(mockCoreLogger.error).toHaveBeenCalledWith('Validation failed', {
        field: 'email',
        context: 'ValidationContext',
        trace: undefined,
      });
    });
  });

  describe('warn() method', () => {
    it('should call coreLogger.warn with message, context, and data', () => {
      adapter.warn('This is a warning', { details: 'check disk space' }, 'SystemContext');
      expect(mockCoreLogger.warn).toHaveBeenCalledWith('This is a warning', {
        details: 'check disk space',
        context: 'SystemContext',
      });
    });
  });

  describe('debug() method', () => {
    it('should call coreLogger.debug with message, context, and data', () => {
      adapter.debug('Debugging payload', { payload: { id: 1 } }, 'DebugContext');
      expect(mockCoreLogger.debug).toHaveBeenCalledWith('Debugging payload', {
        payload: { id: 1 },
        context: 'DebugContext',
      });
    });
  });

  describe('verbose() method', () => {
    it('should call coreLogger.trace with message, context, and data', () => {
      adapter.verbose('Verbose details', { step: 'step 1' }, 'VerboseContext');
      expect(mockCoreLogger.trace).toHaveBeenCalledWith('Verbose details', {
        step: 'step 1',
        context: 'VerboseContext',
      });
    });
  });
});
