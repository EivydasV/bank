import { Account, BaseRepository, DocId, MongooseQuery } from '@app/shared';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountDocument } from '../schema/account.schema';

@Injectable()
export class AccountRepository extends BaseRepository<Account> {
	constructor(
		@InjectModel(Account.name) private readonly accountModel: Model<Account>,
	) {
		super(accountModel);
	}

	findByNumber(number: string): MongooseQuery<AccountDocument> {
		return this.accountModel.findOne({ number });
	}

	countByBelongsTo(belongsTo: DocId): MongooseQuery<number> {
		return this.accountModel.countDocuments({ belongsTo });
	}

	findByBelongsTo(belongsTo: DocId): MongooseQuery<AccountDocument[]> {
		return this.find({ belongsTo });
	}

	findByIds(ids: DocId[]): MongooseQuery<AccountDocument[]> {
		return this.find({ _id: { $in: ids } });
	}
}
