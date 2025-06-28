import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/tests/**/*.test.ts'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  globalSetup: './jest.setup.ts',
  globalTeardown: './jest.teardown.ts',
  setupFilesAfterEnv: ['./jest.setup.ts'],
};

export default config;
