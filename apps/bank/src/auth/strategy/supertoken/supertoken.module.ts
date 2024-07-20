import { USER_CLIENT } from '@app/shared';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ClientsModule, Transport } from '@nestjs/microservices';
import supertokenConfig from './config/supertoken.config';
import { AuthGuard } from './guard/auth.guard';
import { SupertokenMiddleware } from './middleware/supertoken.middleware';
import { SupertokenService } from './service/supertoken.service';

@Module({
	imports: [
		ClientsModule.register([
			{
				name: USER_CLIENT,
				transport: Transport.KAFKA,
				options: {
					client: {
						clientId: 'BANK_AUTH_USER_CLIENT_ID',
						brokers: ['kafka:9092'],
					},
					consumer: {
						groupId: 'BANK_AUTH_USER_CONSUMER_GROUP_ID',
					},
				},
			},
		]),

		ConfigModule.forFeature(supertokenConfig),
	],
	providers: [SupertokenService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class SupertokenModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(SupertokenMiddleware).forRoutes('*');
	}
}
