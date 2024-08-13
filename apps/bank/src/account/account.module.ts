import {
	ACCOUNT_CLIENT,
	CREDIT_CARD_CLIENT,
	SharedModule,
	USER_CLIENT,
	createKafkaClient,
	generateKafkaClientId,
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
			createKafkaClient(ACCOUNT_CLIENT, 'BANK_ACCOUNT_SERVICE'),
			createKafkaClient(USER_CLIENT, 'BANK_USER_SERVICE'),
			createKafkaClient(CREDIT_CARD_CLIENT, 'BANK_CREDIT_CARD_SERVICE'),
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
