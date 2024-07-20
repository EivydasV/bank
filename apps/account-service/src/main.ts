import 'json-bigint-patch';
import { ACCOUNT_CONSUMER_GROUP_ID } from '@app/shared';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AccountServiceModule } from './account-service.module';

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		AccountServiceModule,
		{
			transport: Transport.KAFKA,
			options: {
				client: {
					brokers: ['kafka:9092'],
				},
				consumer: {
					groupId: ACCOUNT_CONSUMER_GROUP_ID,
				},
			},
		},
	);

	await app.listen();
}
bootstrap();
