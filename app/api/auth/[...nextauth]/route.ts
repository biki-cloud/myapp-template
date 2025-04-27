import "reflect-metadata";
import "../_init";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/infrastructure/db/drizzle";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { container } from "tsyringe";
import { IAuthService } from "@/lib/core/services/interface/auth.service.interface";

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const authService = container.resolve<IAuthService>("AuthService");
        const user = await authService.signIn(
          credentials.email,
          credentials.password
        );

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
