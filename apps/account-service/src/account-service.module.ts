import * as path from 'node:path';
import { RpcExceptionInterceptor } from '@app/shared';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AccountModule } from './account/account.module';
import { DbModule } from './db/db.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: path.join('apps', 'account-service', '.env'),
		}),
		DbModule,
		AccountModule,
	],
	controllers: [],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: RpcExceptionInterceptor,
		},
	],
})
export class AccountServiceModule {}
