import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { connectDB } from "@/lib/connectDB";

const handler = NextAuth({
	secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 3600,
		rolling: false,
	},
	providers: [
		CredentialsProvider({
			credentials: {
				email: {},
				password: {},
			},
			async authorize(credentials) {
				const { email, password } = credentials;
				if (!email || !password) {
					return null;
				}
				const db = await connectDB();
				const currentUser = await db.collection("users").findOne({ email });
				if (!currentUser) {
					return null;
				}
				const passwordMatched = bcrypt.compareSync(
					password,
					currentUser.password
				);
				if (!passwordMatched) {
					return null;
				}
				return currentUser;
			},
		}),
	],
	pages: {
		signIn: "/login",
	},
});

export { handler as GET, handler as POST };
