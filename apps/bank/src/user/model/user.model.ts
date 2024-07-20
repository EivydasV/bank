import { TimestampModel } from '@app/shared';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserModel extends TimestampModel {
	@Field(() => String)
	email: string;

	@Field(() => String)
	firstName: string;

	@Field(() => String)
	lastName: string;
}
