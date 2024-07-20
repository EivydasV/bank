import {
	USER_CLIENT,
	User,
	convertToOriginalValues,
	userTopic,
} from '@app/shared';
import {
	type CanActivate,
	type ExecutionContext,
	Inject,
	Injectable,
	OnModuleInit,
	UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ClientKafka } from '@nestjs/microservices';
import { catchError, lastValueFrom, throwError } from 'rxjs';
import Session from 'supertokens-node/recipe/session';
import type { GraphQLContext } from '../../../../graphql/type/graphql-context.type';
import { IS_PUBLIC_KEY } from '../../../decorator/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate, OnModuleInit {
	constructor(
		private readonly reflector: Reflector,
		@Inject(USER_CLIENT) private readonly userClient: ClientKafka,
	) {}

	onModuleInit() {
		this.userClient.subscribeToResponseOf(userTopic.findOneById);
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		if (isPublic) {
			return true;
		}

		const ctx =
			GqlExecutionContext.create(context).getContext<GraphQLContext>();
		const req = ctx.req;
		const res = ctx.res;

		let userId: string | null = null;
		try {
			const session = await Session.getSession(req, res, {
				sessionRequired: false,
				checkDatabase: true,
			});

			req.session = session;

			userId = session !== undefined ? session?.getUserId() : null;
		} catch (err) {
			if (Session.Error.isErrorFromSuperTokens(err)) {
				throw new UnauthorizedException();
			}
		}

		if (!userId) {
			throw new UnauthorizedException();
		}

		const user = await lastValueFrom(
			this.userClient.send<User, string>(userTopic.findOneById, userId).pipe(
				convertToOriginalValues(User),
				catchError(() => throwError(() => new UnauthorizedException())),
			),
		);

		req.user = user;

		return true;
	}
}
