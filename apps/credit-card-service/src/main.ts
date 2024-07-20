import 'json-bigint-patch';
import { CREDIT_CARD_CONSUMER_GROUP_ID } from '@app/shared';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import mongoose from 'mongoose';
import { CreditCardServiceModule } from './credit-card-service.module';
mongoose.set('debug', true);

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		CreditCardServiceModule,
		{
			transport: Transport.KAFKA,
			options: {
				client: {
					brokers: ['kafka:9092'],
				},
				consumer: {
					groupId: CREDIT_CARD_CONSUMER_GROUP_ID,
				},
			},
		},
	);
	await app.listen();
}
bootstrap();
