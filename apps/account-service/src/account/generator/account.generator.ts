import { Account, GeneratorInterface, NumberGenerator } from '@app/shared';
import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../repository/account.repository';

@Injectable()
export class AccountGenerator
	implements GeneratorInterface<Account, Promise<Account>>
{
	constructor(
		private readonly accountRepository: AccountRepository,
		private readonly numberGenerator: NumberGenerator,
	) {}

	async generate(account: Account): Promise<Account> {
		return {
			...account,
			balance: 0n,
			number: await this.generateUniqueAccountNumber(),
		};
	}

	private async generateUniqueAccountNumber(): Promise<string> {
		const accountNumber = `LT${this.numberGenerator.randomNumber(24)}`;
		if (!(await this.accountRepository.findByNumber(accountNumber))) {
			return accountNumber;
		}

		return this.generateUniqueAccountNumber();
	}
}
