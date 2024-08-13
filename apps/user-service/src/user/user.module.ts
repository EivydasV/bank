import { HashingModule, User } from '@app/shared';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controller/user.controller';
import { UserRepository } from './repository/user.repository';
import { UserSaver } from './saver/user.saver';
import { UserSchema } from './schema/user.schema';
import { UserService } from './service/user.service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: User.name,
				schema: UserSchema,
			},
		]),
		HashingModule,
	],
	controllers: [UserController],
	providers: [UserRepository, UserService, UserSaver],
})
export class UserModule {}
