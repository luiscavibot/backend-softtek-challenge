import { inject, injectable } from 'tsyringe';
import { ISwapiPeopleRepository } from '../../domain/repositories/ISwapiPeopleRepository';
import { SWPerson } from '../../domain/entities/SWPerson';

@injectable()
export class GetPersonByIdUseCase {
	constructor(
		@inject('SwapiPeopleRepository')
		private readonly swapiRepo: ISwapiPeopleRepository
	) {}

	public async execute(id: string): Promise<SWPerson> {
		// Podrías validar que "id" sea un número o cumpla algún criterio
		if (!id) {
			throw new Error('ID de personaje no proporcionado.');
		}

		const person = await this.swapiRepo.getPersonById(id);
		return person;
	}
}
