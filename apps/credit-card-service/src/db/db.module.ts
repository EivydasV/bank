import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongoConfig from './config/mongo.config';

@Module({
	imports: [
		MongooseModule.forRootAsync({
			imports: [ConfigModule.forFeature(mongoConfig)],
			inject: [mongoConfig.KEY],
			useFactory: (config: ConfigType<typeof mongoConfig>) => {
				return {
					uri: config.connectionURI,
				};
			},
		}),
	],
	controllers: [],
	providers: [],
})
export class DbModule {}
