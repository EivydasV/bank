import {
	BaseHashing,
	CreateUserInput,
	DocId,
	UpdateUserInput,
	isObjectEmpty,
} from '@app/shared';
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { UserSaver } from '../saver/user.saver';
import { UserDocument } from '../schema/user.schema';

@Injectable()
export class UserService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly userSaver: UserSaver,
		private readonly hashing: BaseHashing,
	) {}

	async createUser(createUserInput: CreateUserInput): Promise<UserDocument> {
		const user = await this.userRepository.findOneByEmail(
			createUserInput.email,
		);

		if (user) {
			throw new BadRequestException('User already exists');
		}

		return await this.userSaver.save(createUserInput);
	}

	async findByEmail(email: string): Promise<UserDocument> {
		const user = await this.userRepository.findOneByEmail(email);
		if (!user) {
			throw new NotFoundException('User not found');
		}

		return user;
	}

	async findById(id: DocId) {
		const user = await this.userRepository.findById(id);
		if (!user) {
			throw new NotFoundException('User not found');
		}

		return user;
	}

	async update({
		userId,
		currentPassword,
		...updateUserInput
	}: UpdateUserInput): Promise<UserDocument> {
		const user = await this.userRepository.findById(userId);
		if (!user) {
			throw new NotFoundException('User not found');
		}

		if (isObjectEmpty(updateUserInput)) {
			return user;
		}

		if (!(await this.hashing.compare(currentPassword, user.password))) {
			throw new BadRequestException('Wrong password');
		}

		const saveUser = await this.userSaver.save(updateUserInput, userId);

		if (!saveUser) {
			throw new NotFoundException('User not found');
		}

		return saveUser;
	}

	async findByIds(ids: DocId[]) {
		return this.userRepository.findByIds(ids);
	}
}
