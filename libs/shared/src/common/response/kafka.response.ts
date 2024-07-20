import { Document } from 'mongoose';

export class KafkaResponse<TValue> {
	constructor(
		private readonly key: string,
		private readonly value: TValue,
		private readonly headers?: Record<string, string | Buffer>,
	) {
		if (this.value instanceof Document) {
			this.value = this.value.toObject();
		}
	}
}
