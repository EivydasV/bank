import { Account, AccountDataLoader, DocId } from '@app/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountService {
	constructor(private readonly accountDataLoader: AccountDataLoader) {}

	async findByConnectedToAccount(
		connectedToAccountId: DocId,
	): Promise<Account> {
		return this.accountDataLoader.loadToResult(connectedToAccountId);
	}
}
