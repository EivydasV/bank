import { CreditCard, CreditCardDataLoader, DocId } from '@app/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreditCardService {
	constructor(private readonly creditCardDataLoader: CreditCardDataLoader) {}

	async findByAccountId(accountId: DocId): Promise<CreditCard[]> {
		return this.creditCardDataLoader.loadManyToResult([accountId]);
	}
}
