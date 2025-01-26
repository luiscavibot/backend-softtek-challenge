import { User } from '../entities/User';

export interface IUserRepository {
	createUser(user: User): Promise<User>;
	findUserByEmail(email: string): Promise<User | null>;
}
