import { User } from '../entities/User';

/**
 * Contrato / Interfaz que deben cumplir todas las implementaciones de repositorios de "User"
 */
export interface IUserRepository {
	createUser(user: User): Promise<User>;
	findUserByEmail(email: string): Promise<User | null>;
	// Otros métodos que requieras
}
