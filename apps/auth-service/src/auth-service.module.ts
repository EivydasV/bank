import * as path from 'node:path';
import { RpcExceptionInterceptor } from '@app/shared';
// import { ConfigifyModule } from '@itgorillaz/configify';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: path.join('apps', 'auth-service', '.env'),
		}),
		AuthModule,
		CommonModule,
	],
	controllers: [],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: RpcExceptionInterceptor,
		},
	],
})
export class AuthServiceModule {}
