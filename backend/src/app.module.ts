import { Module } from '@nestjs/common';
import { ApiController } from './api/api.controller';
import { ApiService } from './api/api.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
	type: 'postgres',
	host: 'postgres',
	port: 5432,
	username: 'postgres',
	password: 'postgres',
	database: 'bloggo',
	entities: [PostEntity],
	synchronize: true
}

@Module({
	imports: [TypeOrmModule.forFeature([PostEntity]),
		TypeOrmModule.forRoot(config)],
	controllers: [AppController, ApiController],
	providers: [AppService, ApiService],
})
export class AppModule {}
