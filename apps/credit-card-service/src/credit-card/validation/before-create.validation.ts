import { CreditCard, ValidatorInterface } from '@app/shared';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreditCardRepository } from '../repository/credit-card.repository';

@Injectable()
export class BeforeCreateValidation implements ValidatorInterface<CreditCard> {
	private readonly MAX_CREDIT_CARDS_PER_ACCOUNT = 5;

	constructor(private readonly creditCardRepository: CreditCardRepository) {}

	async validate(creditCard: Partial<CreditCard>): Promise<void> {
		await this.validateMaxAccounts(creditCard);
	}

	private async validateMaxAccounts(
		creditCard: Partial<CreditCard>,
	): Promise<void> {
		if (!creditCard?.connectedToAccount) {
			throw new Error('connectedToAccount is required');
		}

		const creditCards =
			await this.creditCardRepository.findByConnectedAccountIds([
				creditCard.connectedToAccount,
			]);

		if (creditCards.length >= this.MAX_CREDIT_CARDS_PER_ACCOUNT) {
			throw new BadRequestException(
				`You can have only ${this.MAX_CREDIT_CARDS_PER_ACCOUNT} credit cards per account`,
			);
		}
	}
}
