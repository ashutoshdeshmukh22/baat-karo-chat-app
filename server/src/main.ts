import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './core/filters';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { APP_PORT } from './core/environment';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());

  // cors
  app.enableCors();

  // Swagger configuration
  const options = new DocumentBuilder()
    .setTitle('Baat Karo API')
    .setDescription('Aladdin REST API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: `Please enter token in following format: bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'bearer',
        scheme: 'bearer',
        type: 'http',
        in: 'Header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);

  const swaggerCustomOptions = {
    swaggerOptions: {
      urls: [
        {
          url: '/swagger-json',
          name: 'Swagger JSON',
        },
      ],
    },
  };
  SwaggerModule.setup('swagger', app, document, swaggerCustomOptions);

  await app.listen(APP_PORT);
  logger.debug(`🚀 Server is running on port: ${APP_PORT}`);
}
bootstrap().catch((error) => {
  Logger.error(error);
  throw error;
});
