import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import secureSession from '@fastify/secure-session';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
	AppModule,
	new FastifyAdapter()
  );
//  const app = await NestFactory.create(AppModule);
  console.log()
  await app.register(secureSession, {
	secret: 'testsecrettestsecrettestsecrettestsecret',
	salt: 'testsalttestsalt'
  });
  app.enableCors({
	origin: "http://" + (process.env.HOST_FRONTEND ?
		process.env.HOST_FRONTEND : 'localhost') + ':3000',
	methods: 'GET, POST, DELETE',
	allowedHeaders: 'Content-Type, Authorization'
  });

  await app.listen(3001);
}
bootstrap();
