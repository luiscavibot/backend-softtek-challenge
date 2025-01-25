import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { container } from '../../../infrastructure/di/container';
import { GetAllPeopleUseCase } from '../../../application/use-cases/GetAllPeopleUseCase';
import { GetPersonByIdUseCase } from '../../../application/use-cases/GetPersonByIdUseCase';

export const getPeopleHandler = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	try {
		const useCase = container.resolve(GetAllPeopleUseCase);
		const data = await useCase.execute();

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: 'List of SW characters with APOD',
				data,
			}),
		};
	} catch (error: any) {
		return {
			statusCode: 500,
			body: JSON.stringify({ error: error.message }),
		};
	}
};

export const getPersonByIdHandler = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	try {
		const { id } = event.pathParameters || {};
		if (!id) {
			return {
				statusCode: 400,
				body: JSON.stringify({ error: "No 'id' parameter provided" }),
			};
		}

		const useCase = container.resolve(GetPersonByIdUseCase);
		const data = await useCase.execute(id);

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: `Character ${id} with APOD`,
				data,
			}),
		};
	} catch (error: any) {
		return {
			statusCode: 500,
			body: JSON.stringify({ error: error.message }),
		};
	}
};
