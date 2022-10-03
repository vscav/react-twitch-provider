import type { Config } from 'jest'

export default async (): Promise<Config> => {
  return {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testRegex: '/tests/.*\\.test\\.tsx?$',
    // modulePathIgnorePatterns: ['<rootDir>/examples/'],
    setupFilesAfterEnv: ['<rootDir>/tests/jest-setup.ts'],
    moduleNameMapper: {
      '^react-twitch-provider$': '<rootDir>/lib/index.ts',
    },
    transformIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
    coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '/test/'],
    coverageReporters: ['text', 'html'],
  }
}
