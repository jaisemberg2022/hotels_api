export default {
  testEnvironment: 'node',
  injectGlobals: true,
  transform: {
    '^.+\\.(js|mjs|cjs|ts)$': '@swc/jest',
  },
  setupFilesAfterEnv: ['./tests/setup.js']
}