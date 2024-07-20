import {
	Account,
	DocId,
	NumberGenerator,
	OmitBaseType,
	SaverInterface,
} from '@app/shared';
import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../repository/account.repository';
import { AccountDocument } from '../schema/account.schema';
import { BeforeCreateValidation } from '../validation/before-create.validation';

@Injectable()
export class AccountSaver implements SaverInterface<Account, AccountDocument> {
	constructor(
		private readonly accountRepository: AccountRepository,
		private readonly beforeCreateValidation: BeforeCreateValidation,
		private readonly numberGenerator: NumberGenerator,
	) {}

	async save(
		account: Omit<OmitBaseType<Account>, 'balance' | 'number'>,
	): Promise<AccountDocument>;
	async save(
		account: Partial<Account>,
		accountId: DocId,
	): Promise<AccountDocument | null>;
	async save(
		account: Partial<Account>,
		accountId?: DocId,
	): Promise<AccountDocument | null> {
		if (accountId) {
			return this.accountRepository.findByIdAndUpdate(accountId, account, {
				new: true,
			});
		}

		await this.beforeCreateValidation.validate(account);

		return this.accountRepository.create({
			...account,
			balance: 0n,
			number: await this.generateUniqueAccountNumber(),
		});
	}

	private async generateUniqueAccountNumber(): Promise<string> {
		const accountNumber = `LT${this.numberGenerator.randomNumber(24)}`;
		if (!(await this.accountRepository.findByNumber(accountNumber))) {
			return accountNumber;
		}

		return this.generateUniqueAccountNumber();
	}
}
