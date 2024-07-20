import {
	Catch,
	ExceptionFilter,
	HttpException,
	InternalServerErrorException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
	catch(exception: unknown): HttpException | Observable<unknown> {
		console.log({ exception });
		if (exception instanceof HttpException) {
			return exception;
		}

		if (exception instanceof RpcException) {
			return throwError(() => exception.getError());
		}

		return this.getHttpException(exception);
	}

	private getHttpException(exception: unknown): HttpException {
		if (typeof exception === 'object' && exception !== null) {
			if ('response' in exception && 'status' in exception) {
				if (
					typeof exception.response === 'object' &&
					exception.response !== null &&
					typeof exception.status === 'number'
				) {
					return new HttpException(exception.response, exception.status);
				}
			}
		}

		return new InternalServerErrorException();
	}
}
