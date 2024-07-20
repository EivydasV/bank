export interface EncryptionInterface {
	encrypt(value: string): string;
	decrypt(value: string): string;
}
