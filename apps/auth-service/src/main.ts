import 'json-bigint-patch';
import { AUTH_CONSUMER_GROUP_ID } from '@app/shared';
import { NestFactory } from '@nestjs/core';
import { type MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthServiceModule } from './auth-service.module';

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		AuthServiceModule,
		{
			transport: Transport.KAFKA,
			options: {
				client: {
					brokers: ['kafka:9092'],
				},
				consumer: {
					groupId: AUTH_CONSUMER_GROUP_ID,
				},
			},
		},
	);

	await app.listen();
}
bootstrap();
