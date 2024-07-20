import {
	BadRequestException,
	CallHandler,
	ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
	InternalServerErrorException,
	NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class RpcToHttpInterceptor implements NestInterceptor {
	intercept(
		_context: ExecutionContext,
		next: CallHandler<unknown>,
	): Observable<unknown> | Promise<Observable<unknown>> {
		return next.handle().pipe(
			catchError((err) => {
				console.log({ err });
				if (err instanceof HttpException) {
					return throwError(() => err);
				}

				if (!err?.response && !err?.status) {
					return throwError(() => new InternalServerErrorException());
				}

				return throwError(() => new HttpException(err?.response, err.status));
			}),
		);
	}
}
