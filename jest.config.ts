import type { Config } from 'jest'
// import nextJest from 'next/jest.js'
 const nextJest = require('next/jest.js')


const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
 
// Add any custom config to be passed to Jest
const config: Config = {
  // coverageProvider: 'v8',
  setupFilesAfterEnv:['<rootDir>/jest.setup.js'],
  // testEnvironment: 'jsdom',
  // preset: 'ts-jest',
  // testEnvironment: 'node',
  // moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // moduleNameMapper: {
  //   '^@/(.*)$': '<rootDir>/$1',
  // },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@/app/(.*)$': '<rootDir>/app/$1',
    '^@/app/components/(.*)$': 'app/components/$1',
    '^@/app/cart/(.*)$': 'app/cart/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  // testEnvironment: 'jest-environment-jsdom',
  // testEnvironment: 'node',
  // preset:'ts-jest',
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}
 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports= createJestConfig(config)
// export default createJestConfig(config)