import { UnprocessableEntityException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export const validationExceptionFormatter = (errors: ValidationError[]) => {
	const formattedErrors = errors.reduce<Record<string, string[]>>(
		(prev, curr) => {
			return Object.assign(prev, {
				[curr.property]: Object.values(curr.constraints || {}),
			});
		},
		{},
	);

	throw new UnprocessableEntityException([{ validation: formattedErrors }]);
};
