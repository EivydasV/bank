import {
	ACCOUNT_CLIENT,
	CREDIT_CARD_CLIENT,
	EncryptionModule,
	SharedModule,
	createKafkaClient,
	generateKafkaClientId,
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
			createKafkaClient(CREDIT_CARD_CLIENT, 'BANK_CREDIT_CARD_SERVICE'),
			createKafkaClient(ACCOUNT_CLIENT, 'BANK_ACCOUNT_SERVICE'),
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
