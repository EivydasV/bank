import 'json-bigint-patch';
import { USER_CONSUMER_GROUP_ID } from '@app/shared';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UserServiceModule } from './user-service.module';

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		UserServiceModule,
		{
			transport: Transport.KAFKA,
			options: {
				client: {
					brokers: ['kafka:9092'],
				},
				consumer: {
					groupId: USER_CONSUMER_GROUP_ID,
				},
			},
		},
	);

	await app.listen();
}
bootstrap();
