import type { Config } from 'jest'

export default async (): Promise<Config> => {
  return {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testRegex: '/tests/.*\\.test\\.tsx?$',
    // modulePathIgnorePatterns: ['<rootDir>/examples/'],
    setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
    moduleNameMapper: {
      '^@constants/(.*)$': '<rootDir>/lib/constants/$1',
      '^@context/(.*)$': '<rootDir>/lib/context/$1',
      '^@hooks/(.*)$': '<rootDir>/lib/hooks/$1',
      '^@utils/(.*)$': '<rootDir>/lib/utils/$1',
    },
    transformIgnorePatterns: ['<rootDir>/build/', '<rootDir>/node_modules/'],
    coveragePathIgnorePatterns: ['/node_modules/', '/build/', '/tests/'],
    coverageReporters: ['text', 'html'],
  }
}
