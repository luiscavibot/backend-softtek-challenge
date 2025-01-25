/**
 * Entidad que describe la información básica de un personaje de Star Wars.
 * Puedes ajustarla según la estructura que necesites de SWAPI.
 */
export interface SWPerson {
	name: string;
	height: string;
	mass: string;
	hair_color: string;
	skin_color: string;
	eye_color: string;
	birth_year: string;
	gender: string;
}
