import { DocId, TimestampModel } from '@app/shared';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AccountModel } from '../../account/model/account.model';

@ObjectType()
export class CreditCardModel extends TimestampModel {
	@Field(() => String)
	number: string;

	@Field(() => String)
	firstName: string;

	@Field(() => String)
	lastName: string;

	@Field(() => String)
	cvv: string;

	@Field(() => Date)
	expirationDateAt: Date;

	@Field(() => AccountModel)
	connectedToAccount: AccountModel | DocId;
}
