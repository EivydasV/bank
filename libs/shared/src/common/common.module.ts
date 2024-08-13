import {
	ACCOUNT_CLIENT,
	CREDIT_CARD_CLIENT,
	CreditCardDataLoader,
	NumberGenerator,
	USER_CLIENT,
	UserDataLoader,
} from '@app/shared';
import { AccountDataLoader } from '@app/shared';
import { createKafkaClient } from '@app/shared/util';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
	imports: [
		ClientsModule.register([
			createKafkaClient(CREDIT_CARD_CLIENT, 'COMMON_CREDIT_CARD_SERVICE'),
			createKafkaClient(ACCOUNT_CLIENT, 'COMMON_ACCOUNT_SERVICE'),
			createKafkaClient(USER_CLIENT, 'COMMON_USER_SERVICE'),
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
