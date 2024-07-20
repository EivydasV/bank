import {
	ACCOUNT_CLIENT,
	Account,
	CreateAccountInput,
	DocId,
	accountTopic,
	convertToOriginalValues,
} from '@app/shared';

import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AccountService implements OnModuleInit {
	constructor(
		@Inject(ACCOUNT_CLIENT) private readonly accountClient: ClientKafka,
	) {}

	onModuleInit() {
		this.accountClient.subscribeToResponseOf(accountTopic.create);
		this.accountClient.subscribeToResponseOf(accountTopic.findByBelongsToId);
	}

	async create(
		createAccountInput: CreateAccountInput,
	): Promise<Observable<Account>> {
		return this.accountClient
			.send<Account, CreateAccountInput>(
				accountTopic.create,
				createAccountInput,
			)
			.pipe(convertToOriginalValues(Account));
	}

	async getAccountsByBelongsTo(
		belongsTo: DocId,
	): Promise<Observable<Account[]>> {
		return this.accountClient
			.send<Account[], DocId>(accountTopic.findByBelongsToId, belongsTo)
			.pipe(convertToOriginalValues(Account));
	}
}
