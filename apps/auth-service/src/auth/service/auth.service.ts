import {
	BaseHashing,
	LoginInput,
	USER_CLIENT,
	User,
	userTopic,
} from '@app/shared';
import {
	BadRequestException,
	Inject,
	Injectable,
	OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { catchError, lastValueFrom, throwError } from 'rxjs';

@Injectable()
export class AuthService implements OnModuleInit {
	constructor(
		@Inject(USER_CLIENT) private readonly userClient: ClientKafka,
		private readonly hashing: BaseHashing,
	) {}

	onModuleInit() {
		this.userClient.subscribeToResponseOf(userTopic.findOneByEmail);
	}

	async login(loginInput: LoginInput): Promise<User> {
		const wrongCredentialsError = new BadRequestException('Wrong credentials');

		const user = await lastValueFrom(
			this.userClient
				.send<User, string>(userTopic.findOneByEmail, loginInput.email)
				.pipe(catchError((error) => throwError(() => wrongCredentialsError))),
		);

		if (!(await this.hashing.compare(loginInput.password, user.password))) {
			throw wrongCredentialsError;
		}

		return user;
	}
}
