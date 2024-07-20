import {
	CreditCard,
	DocId,
	GeneratorInterface,
	NumberGenerator,
	OmitBaseType,
} from '@app/shared';
import { Injectable } from '@nestjs/common';
import { CreditCardRepository } from '../repository/credit-card.repository';

@Injectable()
export class CreditCardGenerator
	implements
		GeneratorInterface<
			Pick<CreditCard, 'firstName' | 'lastName' | 'connectedToAccount'>,
			Promise<OmitBaseType<CreditCard>>
		>
{
	constructor(
		private readonly numberGenerator: NumberGenerator,
		private readonly creditCardRepository: CreditCardRepository,
	) {}

	async generate({
		firstName,
		lastName,
		connectedToAccount,
	}: Pick<
		CreditCard,
		'firstName' | 'lastName' | 'connectedToAccount'
	>): Promise<OmitBaseType<CreditCard>> {
		const number = await this.generateNumber();
		const cvv = this.generateCvv();
		const expirationDateAt = this.generateExpirationDateAt();

		return {
			number,
			cvv,
			expirationDateAt,
			connectedToAccount,
			firstName: firstName.toUpperCase(),
			lastName: lastName.toUpperCase(),
		};
	}

	private generateExpirationDateAt(): Date {
		const date = new Date();
		date.setFullYear(date.getFullYear() + 5);

		return date;
	}

	private generateCvv(): string {
		return Number(this.numberGenerator.randomNumber(3)).toString();
	}

	private async generateNumber(): Promise<string> {
		const number = this.numberGenerator.randomNumber(16).toString();
		if (await this.creditCardRepository.findByNumber(number)) {
			return this.generateNumber();
		}

		return number;
	}
}
