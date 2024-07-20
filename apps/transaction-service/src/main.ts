import { TRANSACTION_CONSUMER_GROUP_ID } from '@app/shared';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { TransactionServiceModule } from './transaction-service.module';

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		TransactionServiceModule,
		{
			transport: Transport.KAFKA,
			options: {
				client: {
					brokers: ['kafka:9092'],
				},
				consumer: {
					groupId: TRANSACTION_CONSUMER_GROUP_ID,
				},
			},
		},
	);
	await app.listen();
}
bootstrap();
