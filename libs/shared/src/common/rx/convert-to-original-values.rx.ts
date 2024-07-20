import { IdModel } from '@app/shared/db';
import { Type } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map } from 'rxjs';

export const convertToOriginalValues = <T>(Schema: Type<IdModel>) =>
	map<T, T>((response) => {
		return plainToInstance(Schema, response) as T;
	});
