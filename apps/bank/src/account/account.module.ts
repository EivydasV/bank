import {
	ACCOUNT_CLIENT,
	CREDIT_CARD_CLIENT,
	SharedModule,
	USER_CLIENT,
} from '@app/shared';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AccountResolver } from './resolver/account.resolver';
import { CreditCardResolver } from './resolver/credit-card.resolver';
import { UserResolver } from './resolver/user.resolver';
import { AccountService } from './service/account.service';
import { CreditCardService } from './service/credit-card.service';
import { UserService } from './service/user.service';

@Module({
	imports: [
		SharedModule,
		ClientsModule.register([
			{
				name: ACCOUNT_CLIENT,
				transport: Transport.KAFKA,
				options: {
					client: {
						clientId: 'ACCOUNT_SERVICE_CLIENT_ID',
						brokers: ['kafka:9092'],
					},
					consumer: {
						groupId: 'ACCOUNT_SERVICE_GROUP_ID',
					},
				},
			},
			{
				name: USER_CLIENT,
				transport: Transport.KAFKA,
				options: {
					client: {
						clientId: 'USER_ACCOUNT_SERVICE_CLIENT_ID',
						brokers: ['kafka:9092'],
					},
					consumer: {
						groupId: 'USER_ACCOUNT_SERVICE_GROUP_ID',
					},
				},
			},

			{
				name: CREDIT_CARD_CLIENT,
				transport: Transport.KAFKA,
				options: {
					client: {
						clientId: 'CREDIT_CARD_ACCOUNT_SERVICE_CLIENT_ID_9',
						brokers: ['kafka:9092'],
					},
					consumer: {
						groupId: 'CREDIT_CARD_ACCOUNT_SERVICE_GROUP_ID_9',
					},
				},
			},
		]),
	],
	providers: [
		AccountResolver,
		UserResolver,
		AccountService,
		UserService,
		CreditCardResolver,
		CreditCardService,
	],
	exports: [],
})
export class AccountModule {}
