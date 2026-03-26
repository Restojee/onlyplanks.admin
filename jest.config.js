module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts', '**/?(*.)+(spec|test).ts'],
  moduleNameMapper: {
    '^@ui/(.*)$': '<rootDir>/src/common/components/$1',
    '^@common/(.*)$': '<rootDir>/src/common/$1',
  },
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};
