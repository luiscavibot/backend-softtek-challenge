import { inject, injectable } from 'tsyringe';
import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

@injectable()
export class CreateUserUseCase {
	constructor(
		@inject('UserRepository') private userRepository: IUserRepository
	) {}

	async execute(name: string, email: string): Promise<User> {
		const existingUser = await this.userRepository.findUserByEmail(email);
		if (existingUser) {
			throw new Error('El email ya está registrado.');
		}

		const newUser = new User(Date.now().toString(), name, email);

		const savedUser = await this.userRepository.createUser(newUser);
		return savedUser;
	}
}
