import { CreateCreditCardInput, User } from '@app/shared';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../../auth/decorator/current-user.decorator';
import { CreditCardModel } from '../model/credit-card.model';
import { CreditCardService } from '../service/credit-card.service';

@Resolver(() => CreditCardModel)
export class CreditCardResolver {
	constructor(private readonly creditCardService: CreditCardService) {}

	@Mutation(() => CreditCardModel)
	async createCreditCard(
		@Args('createCreditCardInput') createCreditCardInput: CreateCreditCardInput,
		@CurrentUser() user: User,
	) {
		return await this.creditCardService.create({
			...createCreditCardInput,
			userId: user._id,
		});
	}

	@Query(() => [CreditCardModel])
	async getMyCreditCards(@CurrentUser() user: User) {
		return this.creditCardService.getMyCreditCards(user._id);
	}
}
