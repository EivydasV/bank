import { BaseEvent, CurrencyEnum } from '@app/shared/common';
import { Field, InputType } from '@nestjs/graphql';
import {
	IsAlpha,
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsString,
	IsStrongPassword,
	MaxLength,
} from 'class-validator';

@InputType()
export class CreateUserInput extends BaseEvent {
	@Field(() => String)
	@IsEmail()
	@IsString()
	@MaxLength(255)
	@IsNotEmpty()
	email: string;

	@Field(() => String)
	@IsString()
	@MaxLength(255)
	@IsStrongPassword()
	@IsNotEmpty()
	password: string;

	@Field(() => String)
	@IsAlpha()
	@MaxLength(255)
	@IsNotEmpty()
	firstName: string;

	@Field(() => String)
	@IsAlpha()
	@MaxLength(255)
	@IsNotEmpty()
	lastName: string;
}
