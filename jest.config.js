/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	// Si tus tests están en carpetas "tests" o dentro de src, ajusta según tu preferencia:
	testMatch: ['**/__tests__/**/*.test.ts', '**/?(*.)+(spec|test).ts'],
	// Opcional: si tu proyecto usa decoradores, etc., asegúrate de que tu tsconfig incluyas emitDecoratorMetadata
	// globalSetup, globalTeardown, etc. si fuera necesario
};
