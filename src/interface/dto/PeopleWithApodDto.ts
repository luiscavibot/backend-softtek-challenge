// src/interface/dto/PeopleWithApodDto.ts
import { Expose, Type } from 'class-transformer';

/**
 * DTO para retornar la información de un personaje + la foto de NASA
 */
export class PeopleWithApodDto {
	@Expose()
	name!: string;

	@Expose()
	height!: string;

	@Expose()
	mass!: string;

	// ... Otros campos que quieras exponer

	/**
	 * Campo extra con la data de NASA
	 */
	@Expose()
	@Type(() => ApodDataDto)
	randomGalaxyPhoto!: ApodDataDto;
}

/**
 * DTO anidado para la data APOD
 */
export class ApodDataDto {
	@Expose() date!: string;
	@Expose() explanation!: string;
	@Expose() title!: string;
	@Expose() url!: string;
	// ... otros campos
}
