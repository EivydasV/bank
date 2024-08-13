import 'json-bigint-patch';
import { validationExceptionFormatter } from '@app/shared';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import helmet from 'helmet';
import supertokens from 'supertokens-node';
import { AppModule } from './app.module';
import { SupertokenExceptionFilter } from './auth/strategy/supertoken/filter/supertoken.filter';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors({
		origin: ['http://localhost:3000'],
		allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
		credentials: true,
	});
	app.use(
		helmet({
			contentSecurityPolicy:
				process.env.NODE_ENV === 'production' ? undefined : false,
		}),
	);
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
			whitelist: true,
			forbidUnknownValues: true,
			transformOptions: {
				enableImplicitConversion: true,
			},
			exceptionFactory: validationExceptionFormatter,
		}),
	);

	app.useGlobalFilters(new SupertokenExceptionFilter());
	useContainer(app.select(AppModule), { fallbackOnErrors: true });

	await app.listen(3000);
}
bootstrap();
