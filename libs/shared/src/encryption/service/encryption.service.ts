import * as crypto from 'node:crypto';
import encryptionConfig from '@app/shared/encryption/config/encryption.config';
import { EncryptionInterface } from '@app/shared/encryption/interface';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class EncryptionService implements EncryptionInterface {
	private readonly ALGORITHM = 'aes-256-gcm';
	private readonly KEY: Buffer;

	constructor(
		@Inject(encryptionConfig.KEY)
		private readonly encryptionEnv: ConfigType<typeof encryptionConfig>,
	) {
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		this.KEY = Buffer.from(this.encryptionEnv.key!, 'base64');
	}

	encrypt(value: string): string {
		const iv = crypto.randomBytes(12);
		const cipher = crypto.createCipheriv(this.ALGORITHM, this.KEY, iv);

		let encrypted = cipher.update(value, 'utf8', 'hex');
		encrypted += cipher.final('hex');
		const tag = cipher.getAuthTag().toString('hex');

		return `${iv.toString('hex')}:${tag}:${encrypted}`;
	}

	decrypt(encrypted: string): string {
		const [ivHex, tagHex, ciphertext] = encrypted.split(':');
		const iv = Buffer.from(ivHex, 'hex');
		const tag = Buffer.from(tagHex, 'hex');

		const decipher = crypto.createDecipheriv(this.ALGORITHM, this.KEY, iv);
		decipher.setAuthTag(tag);

		let decrypted = decipher.update(ciphertext, 'hex', 'utf8');
		decrypted += decipher.final('utf8');

		return decrypted;
	}
}
