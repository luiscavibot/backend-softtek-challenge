import { inject, injectable } from 'tsyringe';
import { ISwapiPeopleRepository } from '../../domain/repositories/ISwapiPeopleRepository';
import { SWPerson } from '../../domain/entities/SWPerson';

@injectable()
export class GetAllPeopleUseCase {
	constructor(
		@inject('SwapiPeopleRepository')
		private readonly swapiRepo: ISwapiPeopleRepository
	) {}

	public async execute(): Promise<SWPerson[]> {
		// Aquí puedes aplicar lógica adicional si fuera necesario
		// (paginación, filtrados, validaciones, etc.)
		const people = await this.swapiRepo.getAllPeople();
		return people;
	}
}
