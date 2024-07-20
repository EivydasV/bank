import { BaseRepository, DocId, MongooseQuery, User } from '@app/shared';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../schema/user.schema';

@Injectable()
export class UserRepository extends BaseRepository<User> {
	constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
		super(userModel);
	}

	findOneByEmail(email: string): MongooseQuery<UserDocument | null> {
		return this.userModel.findOne({ email });
	}

	findByIds(ids: DocId[]): MongooseQuery<UserDocument[]> {
		return this.userModel.find({ _id: { $in: ids } });
	}
}
