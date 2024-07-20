import encryptionConfig from '@app/shared/encryption/config/encryption.config';
import { EncryptionService } from '@app/shared/encryption/service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [ConfigModule.forFeature(encryptionConfig)],
	providers: [EncryptionService],
	exports: [EncryptionService],
})
export class EncryptionModule {}
