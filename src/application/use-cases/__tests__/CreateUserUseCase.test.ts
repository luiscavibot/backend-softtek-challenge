import 'reflect-metadata';
import { CreateUserUseCase } from '../CreateUserUseCase';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { User } from '../../../domain/entities/User';

describe('CreateUserUseCase', () => {
	let createUserUseCase: CreateUserUseCase;
	let userRepository: IUserRepository;

	beforeEach(() => {
		userRepository = {
			findUserByEmail: jest.fn(),
			createUser: jest.fn(),
		} as unknown as IUserRepository;

		createUserUseCase = new CreateUserUseCase(userRepository);
	});

	it('should create a new user if email is not registered', async () => {
		const name = 'John Doe';
		const email = 'john.doe@example.com';
		const newUser = new User('1', name, email);

		(userRepository.findUserByEmail as jest.Mock).mockResolvedValue(null);
		(userRepository.createUser as jest.Mock).mockResolvedValue(newUser);

		const result = await createUserUseCase.execute(name, email);

		expect(userRepository.findUserByEmail).toHaveBeenCalledWith(email);
		expect(userRepository.createUser).toHaveBeenCalledWith(
			expect.any(User)
		);
		expect(result).toEqual(newUser);
	});

	it('should throw an error if email is already registered', async () => {
		const name = 'John Doe';
		const email = 'john.doe@example.com';
		const existingUser = new User('1', name, email);

		(userRepository.findUserByEmail as jest.Mock).mockResolvedValue(
			existingUser
		);

		await expect(createUserUseCase.execute(name, email)).rejects.toThrow(
			'El email ya está registrado.'
		);
		expect(userRepository.findUserByEmail).toHaveBeenCalledWith(email);
		expect(userRepository.createUser).not.toHaveBeenCalled();
	});
});
