import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/app/lib/prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callback: {
    async signIn({ profile}: any) {
      const email = profile.email;
      //search user in database
      const existingUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (existingUser) {
        return true;
      } else {
        //create new user
        const newUser = await prisma.user.create({
          data: {
            email: email,
            name: profile.name,
            image: profile.image,
            emailVerified:
              profile.emailVerified !== null
                ? profile.emailVerified
                : undefined, // Set emailVerified to false
          },
        });

        if (newUser) {
          return true;
        } else {
          throw new Error("Failed to create new user");
        }
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
