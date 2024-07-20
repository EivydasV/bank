import {
	ACCOUNT_CLIENT,
	Account,
	accountTopic,
	convertToOriginalValues,
} from '@app/shared/common';
import { DocId } from '@app/shared/db';
import { Inject, Injectable, OnModuleInit, Scope } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { BaseDataLoader } from './base.data-loader';

@Injectable({ scope: Scope.REQUEST })
export class AccountDataLoader extends BaseDataLoader<Account> {
	constructor(
		@Inject(ACCOUNT_CLIENT) private readonly accountClient: ClientKafka,
	) {
		super();
		this.accountClient.subscribeToResponseOf(accountTopic.findByIds);
	}

	protected async query(ids: readonly DocId[]): Promise<Account[]> {
		return lastValueFrom(
			this.accountClient
				.send<Account[], readonly DocId[]>(accountTopic.findByIds, ids)
				.pipe(convertToOriginalValues(Account)),
		);
	}
}
