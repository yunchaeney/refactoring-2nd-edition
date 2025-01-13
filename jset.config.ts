import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testMatch: ['/**/?(*.)(test).ts'],
  transform: {
    '\\.[jt]sx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
};

export default config;
