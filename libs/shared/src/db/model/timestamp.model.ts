import { Field, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IdModel } from './id.model';

@ObjectType()
export class TimestampModel extends IdModel {
	@Transform(({ value }: { value: string }) => new Date(value), {
		toClassOnly: true,
	})
	@Field(() => Date)
	createdAt: Date;

	@Transform(({ value }: { value: string }) => new Date(value), {
		toClassOnly: true,
	})
	@Field(() => Date)
	updatedAt: Date;
}
