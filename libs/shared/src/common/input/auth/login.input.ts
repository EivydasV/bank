import { BaseEvent } from '@app/shared/common';
import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class LoginInput extends BaseEvent {
	@Field(() => String)
	@IsString()
	@Field()
	email: string;

	@Field(() => String)
	@IsString()
	password: string;
}
