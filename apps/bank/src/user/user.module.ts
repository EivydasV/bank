import { USER_CLIENT } from '@app/shared';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserResolver } from './resolver/user.resolver';
import { UserService } from './service/user.service';

@Module({
	imports: [
		ClientsModule.register([
			{
				name: USER_CLIENT,
				transport: Transport.KAFKA,
				options: {
					client: {
						clientId: 'BANK_USER_CLIENT_ID',
						brokers: ['kafka:9092'],
					},
					consumer: {
						groupId: 'BANK_USER_CONSUMER_GROUP_ID',
					},
				},
			},
		]),
	],
	controllers: [],
	providers: [UserResolver, UserService],
})
export class UserModule {}
