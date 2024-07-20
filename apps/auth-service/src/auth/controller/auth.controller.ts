import { LoginInput, User, authTopic } from '@app/shared';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from '../service/auth.service';

@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@MessagePattern(authTopic.login)
	async login(@Payload() loginInput: LoginInput): Promise<User> {
		return this.authService.login(loginInput);
	}
}
