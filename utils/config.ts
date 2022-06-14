import { Config } from '@interfaces/Config';

/** Configration values from environment. */
const config: Config = {
  SLACK_CLIENT_ID: process.env.SLACK_CLIENT_ID ?? '',
  SLACK_CLIENT_SECRET: process.env.SLACK_CLIENT_SECRET ?? '',
  NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? '',
  CONNECTION_STRING: process.env.CONNECTION_STRING ?? '',
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ?? '',
};

export default config;
