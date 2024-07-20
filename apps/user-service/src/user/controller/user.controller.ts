import {
	CreateUserInput,
	DocId,
	KafkaResponse,
	UpdateUserInput,
	userTopic,
} from '@app/shared';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserDocument } from '../schema/user.schema';
import { UserService } from '../service/user.service';

@Controller()
export class UserController {
	constructor(private readonly userService: UserService) {}

	@MessagePattern(userTopic.create)
	async createUser(
		@Payload() createUserInput: CreateUserInput,
	): Promise<KafkaResponse<UserDocument>> {
		const user = await this.userService.createUser(createUserInput);

		return new KafkaResponse(user._id.toString(), user);
	}

	@MessagePattern(userTopic.findOneByEmail)
	async findUserByEmail(
		@Payload() email: string,
	): Promise<KafkaResponse<UserDocument>> {
		const user = await this.userService.findByEmail(email);

		return new KafkaResponse(user._id.toString(), user);
	}

	@MessagePattern(userTopic.findOneById)
	async findUserById(
		@Payload() id: DocId,
	): Promise<KafkaResponse<UserDocument>> {
		const user = await this.userService.findById(id);

		return new KafkaResponse(user._id.toString(), user);
	}

	@MessagePattern(userTopic.update)
	async updateUser(
		@Payload() updateUserInput: UpdateUserInput,
	): Promise<KafkaResponse<UserDocument>> {
		const user = await this.userService.update(updateUserInput);

		return new KafkaResponse(user._id.toString(), user);
	}

	@MessagePattern(userTopic.findByIds)
	async findUsersByIds(
		@Payload() ids: DocId[],
	): Promise<KafkaResponse<UserDocument[]>> {
		const users = await this.userService.findByIds(ids);

		return new KafkaResponse(users.toString(), users);
	}
}
