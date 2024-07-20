import { Account, ValidatorInterface } from '@app/shared';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AccountRepository } from '../repository/account.repository';

@Injectable()
export class BeforeCreateValidation implements ValidatorInterface<Account> {
	private readonly MAX_ACCOUNTS = 5;

	constructor(private readonly accountRepository: AccountRepository) {}

	async validate(account: Partial<Account>): Promise<void> {
		await this.validateMaxAccounts(account);
	}

	private async validateMaxAccounts(account: Partial<Account>): Promise<void> {
		if (!account?.belongsTo) {
			throw new Error('belongsTo is required');
		}

		const accounts = await this.accountRepository.countByBelongsTo(
			account.belongsTo,
		);

		if (accounts >= this.MAX_ACCOUNTS) {
			throw new BadRequestException('You can have only 5 accounts');
		}
	}
}
