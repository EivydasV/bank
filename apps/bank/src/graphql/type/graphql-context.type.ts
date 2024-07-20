import { User } from '@app/shared';
import type { GraphQLExecutionContext } from '@nestjs/graphql';
import type { Request, Response } from 'express';
import type { SessionRequest } from 'supertokens-node/lib/build/framework/express';

export type GraphQLContext = GraphQLExecutionContext & {
	req: Request & {
		user: User | null;
		session: SessionRequest['session'];
		// abilities: AppAbility;
	};
	res: Response;
	session: SessionRequest['session'];
};
