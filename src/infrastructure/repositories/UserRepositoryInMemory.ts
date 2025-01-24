import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';

export class UserRepositoryInMemory implements IUserRepository {
	private users: User[] = [];

	async createUser(user: User): Promise<User> {
		this.users.push(user);
		console.log('Users-->', this.users);
		return user;
	}

	async findUserByEmail(email: string): Promise<User | null> {
		const user = this.users.find((u) => u.email === email);
		return user || null;
	}
}
