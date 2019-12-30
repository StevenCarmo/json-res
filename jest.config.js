module.exports = {
  roots: [
    '<rootDir>/src'
  ],
  moduleFileExtensions: [
    "ts",
    "js"
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  }
};