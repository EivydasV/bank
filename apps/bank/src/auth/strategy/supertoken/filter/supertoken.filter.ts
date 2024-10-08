import {
	type ArgumentsHost,
	Catch,
	type ExceptionFilter,
} from "@nestjs/common";
import type {
	ErrorRequestHandler,
	NextFunction,
	Request,
	Response,
} from "express";

import { Error as STError } from "supertokens-node";
import { errorHandler } from "supertokens-node/framework/express";

@Catch(STError)
export class SupertokenExceptionFilter implements ExceptionFilter {
	handler: ErrorRequestHandler;

	constructor() {
		this.handler = errorHandler();
	}

	catch(exception: Error, host: ArgumentsHost) {
		const ctx = host.switchToHttp();

		const resp = ctx.getResponse<Response>();
		if (resp.headersSent) {
			return;
		}

		this.handler(
			exception,
			ctx.getRequest<Request>(),
			resp,
			ctx.getNext<NextFunction>(),
		);
	}
}
