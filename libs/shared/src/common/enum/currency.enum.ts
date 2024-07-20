import { registerEnumType } from '@nestjs/graphql';

export enum CurrencyEnum {
	USD = 'USD',
	EUR = 'EUR',
}

registerEnumType(CurrencyEnum, {
	name: 'CurrencyEnum',
});
