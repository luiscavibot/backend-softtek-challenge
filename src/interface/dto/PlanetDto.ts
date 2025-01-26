import { Expose } from 'class-transformer';

export class PlanetDto {
	@Expose()
	id!: string;

	@Expose()
	name!: string;

	@Expose()
	climate!: string;

	@Expose()
	terrain!: string;

	@Expose()
	population?: number;
}
