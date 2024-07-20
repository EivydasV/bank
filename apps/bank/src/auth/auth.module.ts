import { AUTH_CLIENT } from '@app/shared';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthResolver } from './resolver/auth.resolver';
import { AuthService } from './service/auth.service';
import { SupertokenModule } from './strategy/supertoken/supertoken.module';

@Module({
	imports: [
		ClientsModule.register([
			{
				name: AUTH_CLIENT,
				transport: Transport.KAFKA,
				options: {
					client: {
						clientId: 'BANK_AUTH_CLIENT_ID',
						brokers: ['kafka:9092'],
					},
					consumer: {
						groupId: 'BANK_AUTH_CONSUMER_GROUP_ID',
					},
				},
			},
		]),
		SupertokenModule,
	],
	controllers: [],
	providers: [AuthResolver, AuthService],
})
export class AuthModule {}
