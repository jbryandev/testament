import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { db } from '@/lib/db';
import { env } from '@/lib/env.mjs';

export const getUserAuth = async () => {
  const session = await getServerSession(authOptions);
  return { session };
};

export const checkAuth = async () => {
  const { session } = await getUserAuth();
  if (!session) redirect('/login');
};

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  callbacks: {
    session: ({ session, user }) => {
      session.user.id = user.id;
      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};
