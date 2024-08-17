module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    testMatch: ['<rootDir>/tests/**/*.test.ts'], // Use this pattern to match test files
  };
  