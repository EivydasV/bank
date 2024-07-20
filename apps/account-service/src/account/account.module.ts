import { Account, SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountController } from './controller/account.controller';
import { AccountGenerator } from './generator/account.generator';
import { AccountRepository } from './repository/account.repository';
import { AccountSaver } from './saver/account.saver';
import { AccountSchema } from './schema/account.schema';
import { AccountService } from './service/account.service';
import { BeforeCreateValidation } from './validation/before-create.validation';

@Module({
	imports: [
		SharedModule,
		MongooseModule.forFeature([
			{
				name: Account.name,
				schema: AccountSchema,
			},
		]),
	],
	controllers: [AccountController],
	providers: [
		AccountService,
		AccountRepository,
		AccountSaver,
		BeforeCreateValidation,
		AccountGenerator,
	],
})
export class AccountModule {}
