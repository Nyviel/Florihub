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
					return {
						id: user.id,
						email: user.email,
						name: user.name,
						isAdmin: user.isAdmin,
					};
				} else {
					return null;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.email = user.email;
				token.isAdmin = user.isAdmin;
				token.name = user.name;
			}
			return token;
		},

		async session({ session, token }) {
			session.user.id = token.id;
			session.user.email = token.email;
			session.user.name = token.name;
			session.user.isAdmin = token.isAdmin;
			return session;
		},
	},
	pages: {
		signIn: "/auth/login",
	},
	secret: process.env.NEXTAUTH_SECRET,
};
