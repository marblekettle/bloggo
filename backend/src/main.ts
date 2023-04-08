import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
	origin: 'http://localhost:3001',
	methods: 'GET, POST, DELETE',
	allowedHeaders: 'Content-Type'
  });
  await app.listen(3001);
}
bootstrap();