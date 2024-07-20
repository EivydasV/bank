import { LoginInput, User } from '@app/shared';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { GraphQLContext } from '../../graphql/type/graphql-context.type';
import { UserModel } from '../../user/model/user.model';
import { CurrentUser } from '../decorator/current-user.decorator';
import { Public } from '../decorator/public.decorator';
import { AuthService } from '../service/auth.service';
import { Session } from '../strategy/supertoken/decorator/session.decorator';

@Resolver()
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	@Public()
	@Mutation(() => Boolean)
	async login(
		@Args('loginInput') loginInput: LoginInput,
		@Context() ctx: GraphQLContext,
	): Promise<boolean> {
		await this.authService.login(loginInput, ctx);

		return true;
	}

	@Query(() => UserModel)
	async me(@CurrentUser() user: User): Promise<UserModel> {
		return user;
	}

	@Mutation(() => Boolean)
	async logout(@Session() session: SessionContainer): Promise<boolean> {
		await session.revokeSession();

		return true;
	}
}
