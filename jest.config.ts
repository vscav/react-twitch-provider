import type { Config } from 'jest'

export default async (): Promise<Config> => {
  return {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testRegex: '/tests/.*\\.test\\.tsx?$',
    modulePathIgnorePatterns: ['<rootDir>/examples/'],
    setupFilesAfterEnv: ['<rootDir>/tests/setup/jest.setup.ts'],
    // moduleNameMapper: {
    //   '^@constants/(.*)$': '<rootDir>/lib/constants/$1',
    //   '^@context/(.*)$': '<rootDir>/lib/context/$1',
    //   '^@hooks/(.*)$': '<rootDir>/lib/hooks/$1',
    //   '^@utils/(.*)$': '<rootDir>/lib/utils/$1',
    // },
    transformIgnorePatterns: ['<rootDir>/build/', '<rootDir>/node_modules/'],
    collectCoverageFrom: ['lib/**/*.{ts,tsx}'],
    // The `twitch-provider.tsx` file is ignored from test coverage because the provider is mocked in tests.
    coveragePathIgnorePatterns: ['/node_modules/', '/build/', '/tests/', '/lib/context/twitch-provider.tsx'],
    coverageReporters: ['text', 'html'],
  }
}
