import { Account } from '@app/shared';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserModel } from '../../user/model/user.model';
import { AccountModel } from '../model/account.model';
import { UserService } from '../service/user.service';

@Resolver(() => AccountModel)
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@ResolveField()
	async belongsTo(@Parent() account: Account): Promise<UserModel> {
		return this.userService.getBelongsTo(account.belongsTo);
	}
}
