import { GetAllPeopleUseCase } from '../GetAllPeopleUseCase';
import { ISwapiPeopleRepository } from '../../../domain/repositories/ISwapiPeopleRepository';
import { INasaApodRepository } from '../../../domain/repositories/INasaApodRepository';
import { ICacheRepository } from '../../../domain/repositories/ICacheRepository';
import { SWPerson } from '../../../domain/entities/SWPerson';

describe('GetAllPeopleUseCase', () => {
	let useCase: GetAllPeopleUseCase;
	let mockSwapiRepo: jest.Mocked<ISwapiPeopleRepository>;
	let mockNasaRepo: jest.Mocked<INasaApodRepository>;
	let mockCacheRepo: jest.Mocked<ICacheRepository>;

	beforeEach(() => {
		mockSwapiRepo = {
			getAllPeople: jest.fn(),
			getPersonById: jest.fn(),
		};

		mockNasaRepo = {
			getRandomApod: jest.fn(),
		};

		mockCacheRepo = {
			getValue: jest.fn(),
			setValue: jest.fn(),
		};

		useCase = new GetAllPeopleUseCase(
			mockSwapiRepo,
			mockNasaRepo,
			mockCacheRepo
		);
	});

	it('debe retornar los datos desde caché si existen', async () => {
		const cachedData = [{ name: 'Luke Skywalker' }];
		mockCacheRepo.getValue.mockResolvedValue(cachedData);

		const result = await useCase.execute();

		expect(mockCacheRepo.getValue).toHaveBeenCalledWith(
			'fusionados-people'
		);
		expect(result).toEqual(cachedData);
		expect(mockSwapiRepo.getAllPeople).not.toHaveBeenCalled();
		expect(mockNasaRepo.getRandomApod).not.toHaveBeenCalled();
		expect(mockCacheRepo.setValue).not.toHaveBeenCalled();
	});

	it('debe llamar a SWAPI y NASA si el caché está vacío', async () => {
		mockCacheRepo.getValue.mockResolvedValue(null);

		const swapiData: SWPerson[] = [
			{
				name: 'Luke Skywalker',
				height: '172',
				mass: '77',
				gender: 'male',
				birth_year: '19BBY',
			},
			{
				name: 'Darth Vader',
				height: '202',
				mass: '136',
				gender: 'male',
				birth_year: '41.9BBY',
			},
		] as any;
		mockSwapiRepo.getAllPeople.mockResolvedValue(swapiData);

		const nasaData = { title: 'A random APOD' };
		mockNasaRepo.getRandomApod.mockResolvedValue(nasaData as any);

		const result = await useCase.execute();

		expect(mockCacheRepo.getValue).toHaveBeenCalledWith(
			'fusionados-people'
		);
		expect(mockSwapiRepo.getAllPeople).toHaveBeenCalled();
		expect(mockNasaRepo.getRandomApod).toHaveBeenCalledTimes(2);

		expect(result).toHaveLength(2);
		expect(result[0].name).toBe('Luke Skywalker');
		expect(result[0].randomGalaxyPhoto).toEqual(nasaData);
		expect(result[1].name).toBe('Darth Vader');
		expect(result[1].randomGalaxyPhoto).toEqual(nasaData);

		expect(mockCacheRepo.setValue).toHaveBeenCalledWith(
			'fusionados-people',
			result,
			30 * 60
		);
	});

	it('debe propagar errores si SWAPI lanza un error', async () => {
		mockCacheRepo.getValue.mockResolvedValue(null);
		mockSwapiRepo.getAllPeople.mockRejectedValue(new Error('SWAPI error'));

		await expect(useCase.execute()).rejects.toThrow('SWAPI error');

		expect(mockNasaRepo.getRandomApod).not.toHaveBeenCalled();

		expect(mockCacheRepo.setValue).not.toHaveBeenCalled();
	});
});
