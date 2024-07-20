import {
	CreateUserInput,
	USER_CLIENT,
	UpdateUserInput,
	User,
	convertToOriginalValues,
	userTopic,
} from '@app/shared';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class UserService implements OnModuleInit {
	constructor(@Inject(USER_CLIENT) private readonly userClient: ClientKafka) {}

	onModuleInit() {
		this.userClient.subscribeToResponseOf(userTopic.create);
		this.userClient.subscribeToResponseOf(userTopic.update);
	}

	async create(createUserInput: CreateUserInput): Promise<Observable<User>> {
		return this.userClient
			.send<User, CreateUserInput>(userTopic.create, createUserInput)
			.pipe(convertToOriginalValues(User));
	}

	async update(updateUserInput: UpdateUserInput): Promise<Observable<User>> {
		return this.userClient
			.send<User, UpdateUserInput>(userTopic.update, updateUserInput)
			.pipe(convertToOriginalValues(User));
	}
}
