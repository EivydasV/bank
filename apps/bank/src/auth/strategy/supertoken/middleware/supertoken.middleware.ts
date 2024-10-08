import { Injectable, type NestMiddleware } from '@nestjs/common';
import type { Request, Response } from 'express';
import { middleware } from 'supertokens-node/framework/express';

@Injectable()
export class SupertokenMiddleware implements NestMiddleware {
	supertokensMiddleware;

	constructor() {
		this.supertokensMiddleware = middleware();
	}

	use(req: Request, res: Response, next: () => void) {
		return this.supertokensMiddleware(req, res, next);
	}
}
