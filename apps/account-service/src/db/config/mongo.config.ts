import { registerAs } from '@nestjs/config';
import { IsNotEmpty, IsString } from 'class-validator';

export default registerAs('mongo', () => ({
	connectionURI: process.env.MONGO_CONNECTION_ACCOUNT,
}));

// @Configuration()
// export class MongoConfig {
// 	@Value('MONGO_CONNECTION_ACCOUNT')
// 	@IsString()
// 	@IsNotEmpty()
// 	connectionURI: string;
// }
