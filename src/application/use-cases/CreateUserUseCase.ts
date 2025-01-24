import { inject, injectable } from 'tsyringe';
import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

/**
 * Caso de uso: crear un nuevo usuario
 *
 * Este caso de uso se encarga de la lógica específica
 * para crear un usuario, validaciones, etc.
 */
@injectable()
export class CreateUserUseCase {
	/**
	 * Inyectamos un repositorio que cumpla la interfaz IUserRepository
	 */
	constructor(
		@inject('UserRepository') private userRepository: IUserRepository
	) {}

	async execute(name: string, email: string): Promise<User> {
		// Podrías verificar si ya existe un usuario con ese email
		const existingUser = await this.userRepository.findUserByEmail(email);
		if (existingUser) {
			throw new Error('El email ya está registrado.');
		}

		// Crear la entidad
		const newUser = new User(Date.now().toString(), name, email);

		// Guardar en el repositorio
		const savedUser = await this.userRepository.createUser(newUser);
		return savedUser;
	}
}
