import { BaseRepository, CreditCard, DocId, MongooseQuery } from '@app/shared';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreditCardDocument } from '../schema/credit-card.schema';

@Injectable()
export class CreditCardRepository extends BaseRepository<CreditCard> {
	constructor(
		@InjectModel(CreditCard.name)
		private readonly creditCardModel: Model<CreditCard>,
	) {
		super(creditCardModel);
	}

	findByNumber(number: string): MongooseQuery<CreditCardDocument | null> {
		return this.creditCardModel.findOne({ number });
	}

	findByConnectedAccountIds(ids: DocId[]): MongooseQuery<CreditCardDocument[]> {
		return this.creditCardModel.find({ connectedToAccount: { $in: ids } });
	}
}
