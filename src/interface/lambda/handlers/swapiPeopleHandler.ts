// src/interface/lambda/handlers/swapiPeopleHandler.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { container } from '../../../infrastructure/di/container';
import { plainToInstance } from 'class-transformer';
import { PeopleWithApodDto } from '../../dto/PeopleWithApodDto';
import { GetAllPeopleUseCase } from '../../../application/use-cases/GetAllPeopleUseCase';
import { GetPersonByIdUseCase } from '../../../application/use-cases/GetPersonByIdUseCase';

export const getPeopleHandler = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	try {
		const useCase = container.resolve(GetAllPeopleUseCase);
		// 1. Obtener objetos raw (domain) del caso de uso
		const peopleWithApod = await useCase.execute();

		// 2. Transformar a un array de DTO
		//    Suponiendo que peopleWithApod es un array de objetos
		const dtoArray = plainToInstance(PeopleWithApodDto, peopleWithApod, {
			excludeExtraneousValues: false,
			// excludeExtraneousValues: true => sólo usar campos con @Expose()
			// depende de si quieres descartar campos no marcados con @Expose()
		});

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: 'List of SW characters with random APOD',
				data: dtoArray, // enviamos ya transformados
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
		const personWithApod = await useCase.execute(id);

		// Transformamos a un objeto DTO
		const dto = plainToInstance(PeopleWithApodDto, personWithApod, {
			excludeExtraneousValues: false,
		});

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: `Character ${id} with random APOD`,
				data: dto,
			}),
		};
	} catch (error: any) {
		return {
			statusCode: 500,
			body: JSON.stringify({ error: error.message }),
		};
	}
};
