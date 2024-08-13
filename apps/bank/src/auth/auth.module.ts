import { AUTH_CLIENT, createKafkaClient } from '@app/shared';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AuthResolver } from './resolver/auth.resolver';
import { AuthService } from './service/auth.service';
import { SupertokenModule } from './strategy/supertoken/supertoken.module';

@Module({
	imports: [
		ClientsModule.register([
			createKafkaClient(AUTH_CLIENT, 'BANK_AUTH_SERVICE'),
		]),
		SupertokenModule,
	],
	controllers: [],
	providers: [AuthResolver, AuthService],
})
export class AuthModule {}
