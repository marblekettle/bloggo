import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
	origin: 'http://' + (process.env.HOST_FRONTENT ?
		process.env.HOST_FRONTEND : 'localhost') + ':3000',
	methods: 'GET, POST, DELETE',
	allowedHeaders: 'Content-Type, Authorization'
  });
  await app.listen(3001);
}
bootstrap();
