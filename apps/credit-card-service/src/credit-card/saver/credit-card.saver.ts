import { CreditCard, DocId, OmitBaseType, SaverInterface } from '@app/shared';
import { EncryptionService } from '@app/shared';
import { Injectable } from '@nestjs/common';
import { CreditCardRepository } from '../repository/credit-card.repository';
import { CreditCardDocument } from '../schema/credit-card.schema';
import { BeforeCreateValidation } from '../validation/before-create.validation';

@Injectable()
export class CreditCardSaver
	implements SaverInterface<CreditCard, CreditCardDocument>
{
	constructor(
		private readonly creditCardRepository: CreditCardRepository,
		private readonly encryptionService: EncryptionService,
		private readonly beforeCreateValidation: BeforeCreateValidation,
	) {}

	async save(creditCard: OmitBaseType<CreditCard>): Promise<CreditCardDocument>;
	async save(
		creditCard: Partial<CreditCard>,
		creditCardId: DocId,
	): Promise<CreditCardDocument | null>;
	async save(
		creditCard: Partial<CreditCard>,
		creditCardId?: DocId,
	): Promise<CreditCardDocument | null> {
		const encryptedCreditCard = this.encryptData(creditCard);

		if (creditCardId) {
			return this.creditCardRepository.findByIdAndUpdate(
				creditCardId,
				encryptedCreditCard,
				{
					new: true,
				},
			);
		}

		await this.beforeCreateValidation.validate(encryptedCreditCard);

		return this.creditCardRepository.create(encryptedCreditCard);
	}

	encryptData(creditCard: Partial<CreditCard>): Partial<CreditCard> {
		if (creditCard?.number) {
			creditCard.number = this.encryptionService.encrypt(creditCard.number);
		}

		if (creditCard?.cvv) {
			creditCard.cvv = this.encryptionService.encrypt(creditCard.cvv);
		}

		return creditCard;
	}
}
