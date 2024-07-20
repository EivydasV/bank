import { documentLimit } from '@app/shared/db';

export class PageLimitReachedError extends Error {
	constructor() {
		super(`page limit reached of ${documentLimit}`);
		this.name = this.constructor.name;
	}
}
