import {
	BaseHashing,
	DocId,
	OmitBaseType,
	SaverInterface,
	User,
} from '@app/shared';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { UserDocument } from '../schema/user.schema';

@Injectable()
export class UserSaver implements SaverInterface<User, UserDocument> {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly hashing: BaseHashing,
	) {}

	async save(user: OmitBaseType<User>): Promise<UserDocument>;
	async save(user: Partial<User>, userId: DocId): Promise<UserDocument | null>;
	async save(
		user: Partial<User>,
		userId?: DocId,
	): Promise<UserDocument | null> {
		if (user?.password) {
			user.password = await this.hashing.hash(user.password);
		}

		if (userId) {
			return this.userRepository.findByIdAndUpdate(userId, user, { new: true });
		}

		return this.userRepository.create(user);
	}
}
