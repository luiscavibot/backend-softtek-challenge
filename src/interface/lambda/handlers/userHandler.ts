import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { container } from '../../../infrastructure/di/container';
import { CreateUserUseCase } from '../../../application/use-cases/CreateUserUseCase';

export const createUserHandler = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	try {
		const body = event.body ? JSON.parse(event.body) : {};
		const { name, email } = body;

		const createUserUseCase = container.resolve(CreateUserUseCase);
		const newUser = await createUserUseCase.execute(name, email);

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: 'Usuario creado con éxito',
				user: newUser,
			}),
		};
	} catch (error: any) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: error.message || 'Error al crear el usuario',
			}),
		};
	}
};
