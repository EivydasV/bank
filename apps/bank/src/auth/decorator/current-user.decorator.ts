import {
	ExecutionContext,
	UnauthorizedException,
	createParamDecorator,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GraphQLContext } from '../../graphql/type/graphql-context.type';

export const CurrentUser = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const gCtx = GqlExecutionContext.create(ctx).getContext<GraphQLContext>();

		const user = gCtx.req?.user;
		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	},
);
