import {
	CreateCreditCardInput,
	DocId,
	KafkaResponse,
	creditCardTopic,
} from '@app/shared';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreditCardDocument } from '../schema/credit-card.schema';
import { CreditCardService } from '../service/credit-card.service';

@Controller()
export class CreditCardController {
	constructor(private readonly creditCardService: CreditCardService) {}

	@MessagePattern(creditCardTopic.create)
	async createCreditCard(
		@Payload() createCreditCardInput: CreateCreditCardInput,
	): Promise<KafkaResponse<CreditCardDocument>> {
		const creditCard = await this.creditCardService.create(
			createCreditCardInput,
		);

		return new KafkaResponse(creditCard._id.toString(), creditCard);
	}

	@MessagePattern(creditCardTopic.getMyCreditCards)
	async getMyCreditCards(
		@Payload() userId: DocId,
	): Promise<KafkaResponse<CreditCardDocument[]>> {
		const creditCards = await this.creditCardService.getMyCreditCards(userId);

		return new KafkaResponse(userId.toString(), creditCards);
	}

	@MessagePattern(creditCardTopic.getByAccountIds)
	async getByAccountIds(
		@Payload() accountIds: DocId[],
	): Promise<KafkaResponse<CreditCardDocument[]>> {
		const creditCards =
			await this.creditCardService.findByAccountId(accountIds);

		return new KafkaResponse(accountIds.toString(), creditCards);
	}
}
