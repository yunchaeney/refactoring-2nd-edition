import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testMatch: ['/**/?(*.)(test).ts'],
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
};

export default config;
