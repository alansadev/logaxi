# Logaxi 🪵

A modern, high-performance, and structured logging library for Node.js applications, with first-class integration for the **NestJS** ecosystem.

Built on top of [Pino.js](https://getpino.io/), Logaxi provides low-overhead JSON logs, ideal for production and containerized environments, while also offering a pleasant development experience with colorful logs (`pretty-print`).

## ✨ Features

- **High Performance:** Inherits the speed and low overhead of Pino.js.
- **Structured Logging:** Generates logs in JSON format by default, ready to be consumed by platforms like Datadog, Splunk, or CloudWatch.
- **Seamless NestJS Integration:** A dedicated `LoggerModule` that integrates perfectly with the NestJS dependency injection system.
- **Framework Agnostic:** The `CoreLogger` can be used in any Node.js application (Express, Fastify, etc.).
- **Configurable:** Easily control the log level and enable `pretty-print` mode for development.
- **Fully Typed:** Developed in TypeScript for maximum safety and autocompletion.

## 🚀 Installation

```bash
npm install logaxi
```

## NestJS - Quick Start

The easiest way to use Logaxi in a NestJS project is by importing the `LoggerModule`.

### 1. Import `LoggerModule` into your `AppModule`

Configure the module using the static `.forRoot()` method.

```typescript
// src/app.module.ts
import { Module } from '@nestjs/common';
import { LoggerModule, LogLevelEnum } from 'logaxi';

@Module({
  imports: [
    LoggerModule.forRoot({
      level: process.env.NODE_ENV !== 'production' ? LogLevelEnum.DEBUG : LogLevelEnum.INFO,
      prettyPrint: process.env.NODE_ENV !== 'production',
    }),
    // ... other modules
  ],
})
export class AppModule {}
```

### 2. Replace the Default Logger in `main.ts`

To ensure the entire application, including NestJS itself, uses Logaxi, inject it in `main.ts`.

```typescript
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestLoggerAdapter } from 'logaxi';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // Buffers logs during application startup
    bufferLogs: true,
  });

  // Replaces the default NestJS logger with our adapter
  app.useLogger(app.get(NestLoggerAdapter));

  await app.listen(3000);
}
bootstrap();
```

### 3. Use it in Your Services

You can now use the standard NestJS `Logger`, and Logaxi will be powering it behind the scenes.

```typescript
// src/app.service.ts
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    this.logger.log('The getHello method was called!');
    this.logger.warn('This is an example warning.', { userId: 123 });
    return 'Hello World!';
  }
}
```

## 🌲 Standalone Usage (Express, Fastify, etc.)

You can use the `CoreLogger` in any Node.js application.

```typescript
import { CoreLogger, LogLevelEnum } from 'logaxi';

const logger = new CoreLogger({
  level: LogLevelEnum.INFO,
  prettyPrint: true, // Great for development
});

logger.info('Server started', { port: 3000 });
logger.error('Failed to connect to the database', { code: 'DB_CONN_ERROR' });
```

## ⚙️ API

### `LoggerOptions`

The options interface that can be passed to `LoggerModule.forRoot()` or the `CoreLogger` constructor.

| Property      | Type           | Default   | Description                                                        |
| :------------ | :------------- | :-------- | :----------------------------------------------------------------- |
| `level`       | `LogLevelEnum` | `'info'`  | The minimum log level to be displayed.                             |
| `prettyPrint` | `boolean`      | `false`   | If `true`, formats logs in a human-readable way for the console.   |

### `LogLevelEnum`

An enum with the available log levels:

- `LogLevelEnum.TRACE`
- `LogLevelEnum.DEBUG`
- `LogLevelEnum.INFO`
- `LogLevelEnum.WARN`
- `LogLevelEnum.ERROR`
- `LogLevelEnum.FATAL`

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open an issue or a pull request.

## 📜 License

This project is licensed under the **ISC License**. See the [LICENSE](LICENSE) file for more details.
