import {
	CREDIT_CARD_CLIENT,
	CreateCreditCardInput,
	CreditCard,
	DocId,
	EncryptionService,
	convertToOriginalValues,
	creditCardTopic,
} from '@app/shared';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable, map } from 'rxjs';

@Injectable()
export class CreditCardService implements OnModuleInit {
	constructor(
		@Inject(CREDIT_CARD_CLIENT) private readonly creditCardClient: ClientKafka,
		private readonly encryptionService: EncryptionService,
	) {}

	onModuleInit() {
		this.creditCardClient.subscribeToResponseOf(creditCardTopic.create);
		this.creditCardClient.subscribeToResponseOf(
			creditCardTopic.getMyCreditCards,
		);
	}

	async create(
		createCreditCardInput: CreateCreditCardInput,
	): Promise<Observable<CreditCard>> {
		return this.creditCardClient
			.send<CreditCard, CreateCreditCardInput>(
				creditCardTopic.create,
				createCreditCardInput,
			)
			.pipe(convertToOriginalValues(CreditCard));
	}

	async getMyCreditCards(userId: DocId) {
		return this.creditCardClient
			.send<CreditCard[], DocId>(creditCardTopic.getMyCreditCards, userId)
			.pipe(
				convertToOriginalValues(CreditCard),
				map((creditCards) =>
					creditCards.map((creditCard) => ({
						...creditCard,
						number: this.encryptionService.decrypt(creditCard.number),
					})),
				),
			);
	}
}
