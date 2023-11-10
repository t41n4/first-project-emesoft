const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./",
});
const customJestConfig = {
  preset: 'ts-jest',  
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ['<rootDir>/__test__/setupTests.tsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
//   collectCoverageFrom: [
//     '<rootDir>/src/**/*.{ts,tsx}',
//     '!<rootDir>/src/**/*.{types,stories ,constants,test,spec}.{ts,tsx}',
    
//   ],
//   coverageThreshold: {
//     "global": {
//         "statements": 80,
//         "branches": 80,
//         "functions": 80,
//         "lines": -10
//     }
// }

};
module.exports = createJestConfig(customJestConfig);