import { User } from '../User';

describe('User Entity', () => {
	it('should create a user with id, name, and email', () => {
		const user = new User('1', 'John Doe', 'john.doe@example.com');
		expect(user.id).toBe('1');
		expect(user.name).toBe('John Doe');
		expect(user.email).toBe('john.doe@example.com');
	});

	it('should allow updating the name and email', () => {
		const user = new User('1', 'John Doe', 'john.doe@example.com');
		user.name = 'Jane Doe';
		user.email = 'jane.doe@example.com';
		expect(user.name).toBe('Jane Doe');
		expect(user.email).toBe('jane.doe@example.com');
	});
});
