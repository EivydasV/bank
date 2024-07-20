import {
	CREDIT_CARD_CLIENT,
	CreditCard,
	FilterType,
	convertToOriginalValues,
	creditCardTopic,
} from '@app/shared/common';
import { DocId } from '@app/shared/db';
import { Inject, Injectable, OnModuleInit, Scope } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { BaseDataLoader } from './base.data-loader';

@Injectable()
export class CreditCardDataLoader extends BaseDataLoader<CreditCard> {
	constructor(
		@Inject(CREDIT_CARD_CLIENT) private readonly creditCardClient: ClientKafka,
	) {
		super();
		this.creditCardClient.subscribeToResponseOf(
			creditCardTopic.getByAccountIds,
		);
	}

	protected async query(ids: readonly DocId[]): Promise<CreditCard[]> {
		return lastValueFrom(
			this.creditCardClient
				.send<CreditCard[], readonly DocId[]>(
					creditCardTopic.getByAccountIds,
					ids,
				)
				.pipe(convertToOriginalValues(CreditCard)),
		);
	}

	protected getKey(): FilterType<CreditCard, DocId> {
		return 'connectedToAccount';
	}
}
