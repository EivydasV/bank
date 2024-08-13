import * as crypto from 'node:crypto';

export const generateKafkaClientId = (name: string): string => {
	return `${name}_${crypto.randomUUID()}`;
};
