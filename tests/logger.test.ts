import { describe, it, expect, vi, beforeEach } from 'vitest';

import { Logger } from '../src/logger';

describe('Src :: Logger', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should call console.log when the log method is invoked', () => {
    const logSpy = vi.spyOn(console, 'log');

    const logger = new Logger();

    logger.log('test log');

    expect(logSpy).toHaveBeenCalledWith('test log');
  });
  it('should call console.warn when the warn method is invoked', () => {
    const logSpy = vi.spyOn(console, 'warn');

    const logger = new Logger();

    logger.warn('test warn');

    expect(logSpy).toHaveBeenCalledWith('test warn');
  });
  it('should call console.error when the error method is invoked', () => {
    const logSpy = vi.spyOn(console, 'error');

    const logger = new Logger();

    logger.error('an error');

    expect(logSpy).toHaveBeenCalledWith('an error');
  });
});
