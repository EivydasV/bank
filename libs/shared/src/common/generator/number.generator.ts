import * as crypto from 'node:crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NumberGenerator {
	randomNumber(length = 16): bigint {
		const numbers: number[] = [];
		for (let i = 0; i < length; i++) {
			numbers.push(crypto.randomInt(0, 9));
		}

		return BigInt(numbers.join(''));
	}
}
