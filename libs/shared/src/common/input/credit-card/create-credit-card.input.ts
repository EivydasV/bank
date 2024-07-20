import { DocId } from '@app/shared/db';
import { Field, HideField, InputType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { GraphQLObjectID } from 'graphql-scalars';

@InputType()
export class CreateCreditCardInput {
	@Field(() => GraphQLObjectID)
	@IsMongoId()
	@IsNotEmpty()
	accountId: DocId;

	@HideField()
	userId: DocId;
}
