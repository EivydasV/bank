import { DocId } from '@app/shared/db';
import { Field, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { GraphQLObjectID } from 'graphql-scalars';
import { Types } from 'mongoose';

@ObjectType()
export class IdModel {
	@Transform(({ value }: { value: string }) => new Types.ObjectId(value), {
		toClassOnly: true,
	})
	@Field(() => GraphQLObjectID)
	_id: DocId;
}
