import {
	ACCOUNT_CLIENT,
	Account,
	CreateCreditCardInput,
	DocId,
	USER_CLIENT,
	User,
	accountTopic,
	convertToOriginalValues,
	userTopic,
} from '@app/shared';
import {
	ForbiddenException,
	Inject,
	Injectable,
	OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreditCardGenerator } from '../generator/credit-card.generator';
import { CreditCardRepository } from '../repository/credit-card.repository';
import { CreditCardSaver } from '../saver/credit-card.saver';
import { CreditCardDocument } from '../schema/credit-card.schema';

@Injectable()
export class CreditCardService implements OnModuleInit {
	constructor(
		private readonly creditCardSaver: CreditCardSaver,
		@Inject(ACCOUNT_CLIENT) private readonly accountClient: ClientKafka,
		@Inject(USER_CLIENT) private readonly userClient: ClientKafka,
		private readonly creditCardGenerator: CreditCardGenerator,
		private readonly creditCardRepository: CreditCardRepository,
	) {}

	onModuleInit() {
		this.accountClient.subscribeToResponseOf(accountTopic.findById);
		this.userClient.subscribeToResponseOf(userTopic.findOneById);
		this.accountClient.subscribeToResponseOf(accountTopic.findByBelongsToId);
	}

	async create(
		createCreditCardInput: CreateCreditCardInput,
	): Promise<CreditCardDocument> {
		const account = await lastValueFrom(
			this.accountClient
				.send<Account, DocId>(
					accountTopic.findById,
					createCreditCardInput.accountId,
				)
				.pipe(convertToOriginalValues(Account)),
		);

		if (account.belongsTo !== createCreditCardInput.userId) {
			throw new ForbiddenException('User does not belong to account');
		}

		const user = await lastValueFrom(
			this.userClient
				.send<User, DocId>(userTopic.findOneById, createCreditCardInput.userId)
				.pipe(convertToOriginalValues(User)),
		);

		const creditCard = await this.creditCardGenerator.generate({
			firstName: user.firstName,
			lastName: user.lastName,
			connectedToAccount: account._id,
		});

		return this.creditCardSaver.save(creditCard);
	}

	async getMyCreditCards(userId: DocId): Promise<CreditCardDocument[]> {
		const accounts = await lastValueFrom(
			this.accountClient
				.send<Account[], DocId>(accountTopic.findByBelongsToId, userId)
				.pipe(convertToOriginalValues(Account)),
		);

		const accountsIds = accounts.map((account) => account._id);

		return this.creditCardRepository.findByConnectedAccountIds(accountsIds);
	}

	async findByAccountId(accountId: DocId[]) {
		return this.creditCardRepository.findByConnectedAccountIds(accountId);
	}
}
