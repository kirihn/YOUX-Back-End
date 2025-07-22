import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  app.enableCors({
    origin: 'http://localhost:5173',
  });

  const config = new DocumentBuilder()
    .setTitle('Users API')
    .setDescription('API для управления пользователями')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(10000);
}
bootstrap();
