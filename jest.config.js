module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    roots: [
      '<rootDir>/src'
    ],
    transform: {
      '^.+\\.tsx?$': 'ts-jest'
    },
    moduleFileExtensions: [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ],
    moduleNameMapper: {
      '@testco/(.*)': '<rootDir>/src/$1',
    },
    moduleDirectories: [
      'node_modules',
      'src',
    ],
  
    // Setup Enzyme
    snapshotSerializers: [
      'enzyme-to-json/serializer'
    ],
    setupFilesAfterEnv: [
      '<rootDir>/setupEnzyme.ts'
    ],
  
    // Setup coverage
    collectCoverage: false,
    collectCoverageFrom: [
      "**/*.{ts,tsx}",
      "!**/node_modules/**",
      "!**/vendor/**"
    ]
  };
  