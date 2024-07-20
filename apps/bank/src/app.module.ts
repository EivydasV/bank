import * as path from 'node:path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { AllExceptionFilter } from './common/filter/all-exception.filter';
import { RpcToHttpInterceptor } from './common/interceptor/rpc-to-http.interceptor';
import { GraphqlModule } from './graphql/graphql.module';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { CreditCardModule } from './credit-card/credit-card.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
	imports: [
		ConfigModule.forRoot({ envFilePath: path.join('apps', 'bank', '.env') }),
		AuthModule,
		CommonModule,
		GraphqlModule,
		UserModule,
		AccountModule,
		CreditCardModule,
		TransactionModule,
	],
	controllers: [],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: RpcToHttpInterceptor,
		},
		{
			provide: APP_FILTER,
			useClass: AllExceptionFilter,
		},
	],
})
export class AppModule {}
