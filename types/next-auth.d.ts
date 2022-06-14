import NextAuth, { DefaultSession } from 'next-auth';

/** Extend next-auth module by adding more properties to session and user interfaces. */
declare module 'next-auth' {
  /**
   * Extend Session by adding user id and default channel of the user.
   */
  interface Session {
    user: {
      id: string;
      defaultChannel: string;
    } & DefaultSession['user'];
  }

  /**
   * Extend User by adding default channel of the user.
   */
  interface User {
    defaultChannel: string;
  }
}
