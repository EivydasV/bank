import { join } from 'node:path';
import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo';
import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import type { SessionRequest } from 'supertokens-node/lib/build/framework/express';

@Global()
@Module({
	imports: [
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			// resolvers: { DocId: DocIdScalar, JSON: GraphQLJSON },
			autoSchemaFile: join(process.cwd(), 'apps', 'bank', 'schema.gql'),
			sortSchema: true,
			buildSchemaOptions: {
				numberScalarMode: 'integer',
			},
			playground: {
				settings: {
					'request.credentials': 'include',
				},
			},
			context: ({ req, res }: { req: SessionRequest; res: Response }) => {
				return {
					req,
					res,
				};
			},
		}),
	],
	providers: [],
	exports: [],
})
export class GraphqlModule {}
