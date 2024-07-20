import { registerAs } from '@nestjs/config';

export default registerAs('mongo', () => ({
	connectionURI: process.env.MONGO_CONNECTION_ACCOUNT,
}));
