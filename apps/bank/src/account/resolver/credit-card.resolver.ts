import { Account } from '@app/shared';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CreditCardModel } from '../../credit-card/model/credit-card.model';
import { AccountModel } from '../model/account.model';
import { CreditCardService } from '../service/credit-card.service';

@Resolver(() => AccountModel)
export class CreditCardResolver {
	constructor(private readonly creditCardService: CreditCardService) {}

	@ResolveField()
	async creditCards(@Parent() account: Account): Promise<CreditCardModel[]> {
		return this.creditCardService.findByAccountId(account._id);
	}
}
