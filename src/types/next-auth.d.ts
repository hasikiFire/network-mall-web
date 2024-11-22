import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  type UserSession = User;
  interface Session {
    user: User;
  }

  interface CredentialsInputs {
    email: string;
    password: string;
  }
}
