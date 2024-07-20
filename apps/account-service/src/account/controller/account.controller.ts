import {
	Account,
	CreateAccountInput,
	DocId,
	KafkaResponse,
	accountTopic,
} from '@app/shared';

import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AccountService } from '../service/account.service';

@Controller()
export class AccountController {
	constructor(private readonly accountService: AccountService) {}

	@MessagePattern(accountTopic.create)
	async createAccount(
		@Payload() createAccountInput: CreateAccountInput,
	): Promise<KafkaResponse<Account>> {
		const newAccount = await this.accountService.create(createAccountInput);

		return new KafkaResponse(newAccount._id.toString(), newAccount);
	}

	@MessagePattern(accountTopic.findByBelongsToId)
	async getAccountsByBelongsTo(
		@Payload() userId: DocId,
	): Promise<KafkaResponse<Account[]>> {
		const myAccounts = await this.accountService.getAccountsByBelongsTo(userId);

		return new KafkaResponse(userId.toString(), myAccounts);
	}

	@MessagePattern(accountTopic.findById)
	async getAccountById(
		@Payload() accountId: DocId,
	): Promise<KafkaResponse<Account>> {
		const account = await this.accountService.findById(accountId);

		return new KafkaResponse(accountId.toString(), account);
	}

	@MessagePattern(accountTopic.findByIds)
	async getAccountByIds(
		@Payload() accountIds: DocId[],
	): Promise<KafkaResponse<Account[]>> {
		const accounts = await this.accountService.findByIds(accountIds);

		return new KafkaResponse(accountIds.toString(), accounts);
	}
}
