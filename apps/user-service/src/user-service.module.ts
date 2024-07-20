import * as path from 'node:path';
import { RpcExceptionInterceptor } from '@app/shared';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DbModule } from './db/db.module';
import { UserModule } from './user/user.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: path.join('apps', 'user-service', '.env'),
		}),
		UserModule,
		DbModule,
	],
	controllers: [],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: RpcExceptionInterceptor,
		},
	],
})
export class UserServiceModule {}
