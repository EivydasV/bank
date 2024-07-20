import { DocId } from '@app/shared/db';
import {
	Field,
	HideField,
	InputType,
	PartialType,
	PickType,
} from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(
	PickType(CreateUserInput, ['email', 'firstName', 'lastName', 'password']),
) {
	@Field(() => String)
	@IsString()
	currentPassword: string;

	@HideField()
	userId: DocId;
}
