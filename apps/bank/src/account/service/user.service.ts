import { DocId, User, UserDataLoader } from '@app/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
	constructor(private readonly userDataLoader: UserDataLoader) {}

	async getBelongsTo(belongsToId: DocId): Promise<User> {
		return this.userDataLoader.loadToResult(belongsToId);
	}
}
