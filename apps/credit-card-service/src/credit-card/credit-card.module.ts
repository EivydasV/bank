import {
	ACCOUNT_CLIENT,
	CreditCard,
	SharedModule,
	USER_CLIENT,
	createKafkaClient,
	generateKafkaClientId,
} from '@app/shared';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { CreditCardController } from './controller/credit-card.controller';
import { CreditCardGenerator } from './generator/credit-card.generator';
import { CreditCardRepository } from './repository/credit-card.repository';
import { CreditCardSaver } from './saver/credit-card.saver';
import { CreditCardSchema } from './schema/credit-card.schema';
import { CreditCardService } from './service/credit-card.service';
import { BeforeCreateValidation } from './validation/before-create.validation';

@Module({
	imports: [
		ClientsModule.register([
			createKafkaClient(ACCOUNT_CLIENT, 'CREDIT_CARD_ACCOUNT_SERVICE'),
			createKafkaClient(USER_CLIENT, 'CREDIT_CARD_USER_SERVICE'),
		]),
		MongooseModule.forFeature([
			{
				name: CreditCard.name,
				schema: CreditCardSchema,
			},
		]),
		SharedModule,
	],
	controllers: [CreditCardController],
	providers: [
		CreditCardRepository,
		CreditCardService,
		CreditCardSaver,
		CreditCardGenerator,
		BeforeCreateValidation,
	],
})
export class CreditCardModule {}
