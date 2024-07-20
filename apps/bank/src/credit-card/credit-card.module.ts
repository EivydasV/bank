import {
	ACCOUNT_CLIENT,
	CREDIT_CARD_CLIENT,
	EncryptionModule,
	SharedModule,
} from '@app/shared';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AccountResolver } from './resolver/account.resolver';
import { CreditCardResolver } from './resolver/credit-card.resolver';
import { AccountService } from './service/account.service';
import { CreditCardService } from './service/credit-card.service';

@Module({
	imports: [
		SharedModule,
		ClientsModule.register([
			{
				name: CREDIT_CARD_CLIENT,
				transport: Transport.KAFKA,
				options: {
					client: {
						clientId: 'CREDIT_CARD_SERVICE_CLIENT_ID',
						brokers: ['kafka:9092'],
					},
					consumer: {
						groupId: 'CREDIT_CARD_SERVICE_GROUP_ID',
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
		]),
	],
	controllers: [],
	providers: [
		CreditCardResolver,
		AccountResolver,
		CreditCardService,
		AccountService,
	],
	exports: [],
})
export class CreditCardModule {}
