import { CommonModule } from '@app/shared/common/common.module';
import { DbModule } from '@app/shared/db';
import { HashingModule } from '@app/shared/hashing';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EncryptionModule } from './encryption/encryption.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env',
		}),
		DbModule,
		HashingModule,
		EncryptionModule,
		CommonModule,
	],
	providers: [],
	exports: [CommonModule, EncryptionModule],
})
export class SharedModule {}
