import { generateKafkaClientId } from '@app/shared/util/generate-kafka-client-id.util';
import { ClientProviderOptions, Transport } from '@nestjs/microservices';

export const createKafkaClient = (
	name: symbol,
	clientName: string,
): ClientProviderOptions => {
	return {
		name,
		transport: Transport.KAFKA,
		options: {
			client: {
				clientId: generateKafkaClientId(`${clientName}_CLIENT_ID`),
				brokers: ['kafka:9092'],
			},
			consumer: {
				groupId: generateKafkaClientId(`${clientName}_GROUP_ID`),
			},
		},
	};
};
