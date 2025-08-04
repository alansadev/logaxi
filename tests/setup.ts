import { vi } from 'vitest';

export const pinoInstanceMock = {
  trace: vi.fn(),
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
  fatal: vi.fn(),
};

export const pinoFactoryMock = vi.fn(() => pinoInstanceMock);

vi.mock('pino', () => ({
  default: pinoFactoryMock,
  transport: vi.fn(config => config),
}));
