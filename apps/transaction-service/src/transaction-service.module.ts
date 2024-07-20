import * as path from 'node:path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from '../../credit-card-service/src/db/db.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: path.join('apps', 'transaction-service', '.env'),
		}),
		DbModule,

		TransactionModule,
	],
	controllers: [],
	providers: [],
})
export class TransactionServiceModule {}
