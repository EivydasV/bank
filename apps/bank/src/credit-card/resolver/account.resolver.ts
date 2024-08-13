import { Account, CreditCard } from '@app/shared';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CreditCardModel } from '../model/credit-card.model';
import { AccountService } from '../service/account.service';

@Resolver(() => CreditCardModel)
export class AccountResolver {
	constructor(private readonly accountService: AccountService) {}

	@ResolveField()
	async connectedToAccount(@Parent() creditCard: CreditCard): Promise<Account> {
		return this.accountService.findByConnectedToAccount(
			creditCard.connectedToAccount,
		);
	}
}
