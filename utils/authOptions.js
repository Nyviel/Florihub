import User from "@/models/User";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import connectDB from "./database";

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: "credentials",
			async authorize(credentials, _) {
				await connectDB();
				const { email, password } = credentials;
				const user = await User.findOne({ email });
				if (!user) {
					return null;
				}

				const pwdMatch = await bcrypt.compare(password, user.password);
				if (!pwdMatch) {
					return null;
				}

				if (user && pwdMatch) {
					return user;
				} else {
					return null;
				}
			},
		}),
	],
	callbacks: {
		async session({ session, token, user }) {
			console.log("session, token, user: ", session, token, user);
			if (token && token.sub) {
				session.user.id = token.sub;
			}
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: "/auth/login",
	},
};
