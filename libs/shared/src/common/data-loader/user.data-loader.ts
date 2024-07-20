import {
	USER_CLIENT,
	User,
	convertToOriginalValues,
	userTopic,
} from '@app/shared/common';
import { DocId } from '@app/shared/db';
import { Inject, Injectable, OnModuleInit, Scope } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { BaseDataLoader } from './base.data-loader';

@Injectable()
export class UserDataLoader extends BaseDataLoader<User> {
	constructor(@Inject(USER_CLIENT) private readonly userClient: ClientKafka) {
		super();
		this.userClient.subscribeToResponseOf(userTopic.findByIds);
	}

	protected async query(ids: readonly DocId[]): Promise<User[]> {
		return lastValueFrom(
			this.userClient
				.send<User[], readonly DocId[]>(userTopic.findByIds, ids)
				.pipe(convertToOriginalValues(User)),
		);
	}
}
