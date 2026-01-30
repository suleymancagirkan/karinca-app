import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        AppleProvider({
            clientId: process.env.APPLE_ID,
            clientSecret: process.env.APPLE_SECRET,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });

                if (!user || !user.password) {
                    return null;
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isCorrectPassword) {
                    return null;
                }

                return user;
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            // Initial sign in
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.name = user.fullname;
                token.role = user.role;
                token.createdAt = user.createdAt;
                token.bio = user.bio;
            }

            if (trigger === "update" && session?.user) {
                token.name = session.user.name;
                token.bio = session.user.bio;
            }

            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id;
                session.user.username = token.username;
                session.user.name = token.name;
                session.user.role = token.role;
                session.user.createdAt = token.createdAt;
                session.user.bio = token.bio;
            }
            return session;
        }
    },
    pages: {
        signIn: '/login',
    },
    debug: process.env.NODE_ENV === 'development',
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };