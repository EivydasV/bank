import { DocId } from '@app/shared/db';
import { Field, HideField, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { CurrencyEnum } from '../../enum/currency.enum';

@InputType()
export class CreateAccountInput {
	@Field(() => CurrencyEnum)
	@IsEnum(CurrencyEnum)
	@IsNotEmpty()
	currency: CurrencyEnum;

	@HideField()
	belongsTo: DocId;
}
