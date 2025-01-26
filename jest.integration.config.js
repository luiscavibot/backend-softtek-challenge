/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	// Buscamos tests en una carpeta "integration" o con sufijo ".integration.test.ts"
	testMatch: ['**/__integration__/**/*.test.ts', '**/*.integration.test.ts'],
	// Configura setupFiles si necesitas "reflect-metadata", etc.
	setupFiles: ['<rootDir>/jest.setup.ts'],
	// Aumenta el timeout si las llamadas tardan
	testTimeout: 30000,
};
