import {
	USER_CLIENT,
	createKafkaClient,
	generateKafkaClientId,
} from '@app/shared';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserResolver } from './resolver/user.resolver';
import { UserService } from './service/user.service';

@Module({
	imports: [
		ClientsModule.register([
			createKafkaClient(USER_CLIENT, 'BANK_USER_SERVICE'),
		]),
	],
	controllers: [],
	providers: [UserResolver, UserService],
})
export class UserModule {}
