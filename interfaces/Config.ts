/** Configration values retrieved from environment. */
export interface Config {
  /** Slack Bot ID for this application. */
  SLACK_CLIENT_ID: string;
  /** Slack Bot secret for this application. */
  SLACK_CLIENT_SECRET: string;
  /** The URL of this application in order to redirect after sign in with slack. */
  NEXTAUTH_URL: string;
  /** Used to encrypt the NextAuth.js JWT, and to hash email verification tokens. */
  NEXTAUTH_SECRET: string;
  /** Database connection string. */
  CONNECTION_STRING: string;
}
