// src/interface/dto/CreatePlanetDto.ts
import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class CreatePlanetDto {
	@IsString()
	name!: string;

	@IsString()
	climate!: string;

	@IsString()
	terrain!: string;

	@IsOptional()
	@IsInt()
	@Min(0)
	population?: number;
}
