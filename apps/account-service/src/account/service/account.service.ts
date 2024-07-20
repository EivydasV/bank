import { CreateAccountInput, DocId } from '@app/shared';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountRepository } from '../repository/account.repository';
import { AccountSaver } from '../saver/account.saver';
import { AccountDocument } from '../schema/account.schema';

@Injectable()
export class AccountService {
	constructor(
		private readonly accountRepository: AccountRepository,
		private readonly accountSaver: AccountSaver,
	) {}

	async create(
		createAccountInput: CreateAccountInput,
	): Promise<AccountDocument> {
		return this.accountSaver.save(createAccountInput);
	}

	async getAccountsByBelongsTo(belongsTo: DocId): Promise<AccountDocument[]> {
		return this.accountRepository.findByBelongsTo(belongsTo);
	}

	async findById(id: DocId): Promise<AccountDocument> {
		const account = await this.accountRepository.findById(id);
		if (!account) {
			throw new NotFoundException('Account not found');
		}

		return account;
	}

	async findByIds(accountIds: DocId[]): Promise<AccountDocument[]> {
		return this.accountRepository.findByIds(accountIds);
	}
}
