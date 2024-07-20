import {
	HashingModule,
	USER_CLIENT,
	USER_CONSUMER_GROUP_ID,
} from '@app/shared';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_CLIENT_ID } from '../common/constant/client-id.constant';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';

@Module({
	imports: [
		HashingModule,
		ClientsModule.register([
			{
				name: USER_CLIENT,
				transport: Transport.KAFKA,
				options: {
					client: {
						clientId: 'AUTH_SERVICE_CLIENT_ID',
						brokers: ['kafka:9092'],
					},
					consumer: {
						groupId: 'AUTH_SERVICE_GROUP_ID',
					},
				},
			},
		]),
	],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
