import { CurrencyEnum, DocId, TimestampModel } from '@app/shared';
import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLBigInt } from 'graphql-scalars';
import { CreditCardModel } from '../../credit-card/model/credit-card.model';
import { UserModel } from '../../user/model/user.model';

@ObjectType()
export class AccountModel extends TimestampModel {
	@Field(() => String)
	number: string;

	@Field(() => GraphQLBigInt)
	balance: bigint;

	@Field(() => CurrencyEnum)
	currency: CurrencyEnum;

	@Field(() => UserModel)
	belongsTo: UserModel | DocId;

	@Field(() => [CreditCardModel])
	creditCards?: CreditCardModel[];
}
