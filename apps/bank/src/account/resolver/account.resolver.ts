import { CreateAccountInput, User } from '@app/shared';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { CurrentUser } from '../../auth/decorator/current-user.decorator';
import { AccountModel } from '../model/account.model';
import { AccountService } from '../service/account.service';

@Resolver(() => AccountModel)
export class AccountResolver {
	constructor(private readonly accountService: AccountService) {}

	@Mutation(() => AccountModel)
	async createAccount(
		@Args('createAccountInput') createAccountInput: CreateAccountInput,
		@CurrentUser() user: User,
	): Promise<Observable<AccountModel>> {
		return await this.accountService.create({
			...createAccountInput,
			belongsTo: user._id,
		});
	}

	@Query(() => [AccountModel])
	async getMyAccounts(
		@CurrentUser() user: User,
	): Promise<Observable<AccountModel[]>> {
		return this.accountService.getAccountsByBelongsTo(user._id);
	}
}
