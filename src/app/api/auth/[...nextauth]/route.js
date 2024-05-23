import clientPromise from "@/lib/nextauth/dbClientPromise";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session, user }) {
            // Add the unique identifier to the session object
            session.user.id = user.id;
            return session;
        },
    },
    adapter: MongoDBAdapter(clientPromise)
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
