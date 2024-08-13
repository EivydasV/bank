import {
	USER_CLIENT,
	createKafkaClient,
	generateKafkaClientId,
} from '@app/shared';
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
			createKafkaClient(USER_CLIENT, 'BANK_AUTH_USER_SERVICE'),
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
