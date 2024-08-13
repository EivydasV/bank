import {
	HashingModule,
	USER_CLIENT,
	createKafkaClient,
	generateKafkaClientId,
} from '@app/shared';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';

@Module({
	imports: [
		HashingModule,
		ClientsModule.register([createKafkaClient(USER_CLIENT, 'AUTH_SERVICE')]),
	],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
