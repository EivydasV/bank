import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const Session = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const request = GqlExecutionContext.create(ctx).getContext().req;
		return request.session;
	},
);
