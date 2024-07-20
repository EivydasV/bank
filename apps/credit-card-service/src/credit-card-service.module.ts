import * as path from 'node:path';
import { RpcExceptionInterceptor } from '@app/shared';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CreditCardModule } from './credit-card/credit-card.module';
import { DbModule } from './db/db.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: path.join('apps', 'credit-card-service', '.env'),
		}),
		DbModule,
		CreditCardModule,
	],
	controllers: [],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: RpcExceptionInterceptor,
		},
	],
})
export class CreditCardServiceModule {}
