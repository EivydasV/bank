import { ArgonHashing, BaseHashing } from '@app/shared/hashing/hash';
import { Module } from '@nestjs/common';

@Module({
	providers: [
		{
			provide: BaseHashing,
			useClass: ArgonHashing,
		},
	],
	exports: [BaseHashing],
})
export class HashingModule {}
