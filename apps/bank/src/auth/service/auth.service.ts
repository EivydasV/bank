import {
	AUTH_CLIENT,
	LoginInput,
	User,
	authTopic,
	convertToOriginalValues,
} from '@app/shared';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { convertToRecipeUserId } from 'supertokens-node';
import { createNewSession } from 'supertokens-node/recipe/session';
import { GraphQLContext } from '../../graphql/type/graphql-context.type';

@Injectable()
export class AuthService implements OnModuleInit {
	constructor(@Inject(AUTH_CLIENT) private readonly authClient: ClientKafka) {}

	onModuleInit() {
		this.authClient.subscribeToResponseOf(authTopic.login);
	}

	async login(loginInput: LoginInput, ctx: GraphQLContext): Promise<User> {
		const user = await lastValueFrom(
			this.authClient
				.send<User, LoginInput>(authTopic.login, loginInput)
				.pipe(convertToOriginalValues(User)),
		);

		await createNewSession(
			ctx.req,
			ctx.res,
			'public',
			convertToRecipeUserId(user._id.toString()),
		);

		return user;
	}
}
