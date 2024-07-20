import { registerAs } from '@nestjs/config';

export default registerAs('encryption', () => ({
	key: process.env.KEY,
	iv: process.env.IV,
}));
