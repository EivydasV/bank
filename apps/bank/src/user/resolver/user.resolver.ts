import { CreateUserInput, UpdateUserInput, User } from '@app/shared';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { CurrentUser } from '../../auth/decorator/current-user.decorator';
import { Public } from '../../auth/decorator/public.decorator';
import { UserModel } from '../model/user.model';
import { UserService } from '../service/user.service';

@Resolver(() => UserModel)
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Public()
	@Mutation(() => UserModel)
	async createUser(
		@Args('createUserInput') createUserInput: CreateUserInput,
	): Promise<Observable<UserModel>> {
		return await this.userService.create(createUserInput);
	}

	@Mutation(() => UserModel)
	async updateUser(
		@Args('updateUserInput') updateUserInput: UpdateUserInput,
		@CurrentUser() user: User,
	): Promise<Observable<UserModel>> {
		return await this.userService.update({
			...updateUserInput,
			userId: user._id,
		});
	}
}
