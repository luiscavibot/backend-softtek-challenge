import { SWPerson } from '../entities/SWPerson';

/**
 * Contrato para interactuar con SWAPI (People endpoint).
 */
export interface ISwapiPeopleRepository {
	getAllPeople(): Promise<SWPerson[]>; // Retornar la lista de personajes
	getPersonById(id: string): Promise<SWPerson>; // Retornar un personaje por su ID
}
