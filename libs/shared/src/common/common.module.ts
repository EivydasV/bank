import {
	ACCOUNT_CLIENT,
	CREDIT_CARD_CLIENT,
	CreditCardDataLoader,
	NumberGenerator,
	USER_CLIENT,
	UserDataLoader,
} from '@app/shared';
import { AccountDataLoader } from '@app/shared/common/data-loader/account.data-loader';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
	imports: [
		ClientsModule.register([
			{
				name: CREDIT_CARD_CLIENT,
				transport: Transport.KAFKA,
				options: {
					client: {
						clientId: 'CREDIT_CARD_SERVICE_CLIENT_ID_2',
						brokers: ['kafka:9092'],
					},
					consumer: {
						groupId: 'CREDIT_CARD_SERVICE_GROUP_ID_2',
					},
				},
			},
			{
				name: ACCOUNT_CLIENT,
				transport: Transport.KAFKA,
				options: {
					client: {
						clientId: 'ACCOUNT_CREDIT_CARD_SERVICE_CLIENT_ID',
						brokers: ['kafka:9092'],
					},
					consumer: {
						groupId: 'ACCOUNT_CREDIT_CARD_SERVICE_GROUP_ID',
					},
				},
			},
			{
				name: USER_CLIENT,
				transport: Transport.KAFKA,
				options: {
					client: {
						clientId: 'ACCOUNT_CREDIT_CARD_SERVICE_CLIENT_ID',
						brokers: ['kafka:9092'],
					},
					consumer: {
						groupId: 'ACCOUNT_CREDIT_CARD_SERVICE_GROUP_ID',
					},
				},
			},
		]),
	],
	providers: [
		NumberGenerator,
		CreditCardDataLoader,
		UserDataLoader,
		AccountDataLoader,
	],
	exports: [
		NumberGenerator,
		CreditCardDataLoader,
		UserDataLoader,
		AccountDataLoader,
	],
})
export class CommonModule {}
