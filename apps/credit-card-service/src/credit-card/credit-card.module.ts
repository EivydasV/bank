import {
	ACCOUNT_CLIENT,
	CreditCard,
	SharedModule,
	USER_CLIENT,
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
			{
				name: ACCOUNT_CLIENT,
				transport: Transport.KAFKA,
				options: {
					client: {
						clientId: 'CREDIT_CARD_ACCOUNT_SERVICE_CLIENT_ID_2',
						brokers: ['kafka:9092'],
					},
					consumer: {
						groupId: 'CREDIT_CARD_ACCOUNT_SERVICE_GROUP_ID_2',
					},
				},
			},
			{
				name: USER_CLIENT,
				transport: Transport.KAFKA,
				options: {
					client: {
						clientId: 'CREDIT_CARD_USER_SERVICE_CLIENT_ID',
						brokers: ['kafka:9092'],
					},
					consumer: {
						groupId: 'CREDIT_CARD_USER_SERVICE_GROUP_ID',
					},
				},
			},
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
