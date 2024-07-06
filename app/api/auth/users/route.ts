import User from "@/models/User";
import { authOptions } from "@/utils/authOptions";
import connectDB from "@/utils/database";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";

//GET: api/auth/users
export const GET = async (request: Request) => {
	try {
		await connectDB();
		const session = await getServerSession(authOptions);
		console.log(session);
		if (!session || !session.user.id || !session?.user.isAdmin) {
			return new Response("Unauthorized", { status: 401 });
		}

		const users = await User.find();

		return new Response(JSON.stringify(users), { status: 200 });
	} catch (error) {
		console.error("API:(/api/auth/users) ENCOUNTERED ERROR: ", error);
		return new Response("Unexpected server error", { status: 500 });
	}
};

// POST: api/auth/users
export const POST = async (request: Request) => {
	try {
		await connectDB();
		const body = await request.json();
		const { name, email, password } = body;
		const hash = await bcrypt.hash(password, 10);
		const createdUser = await User.create({
			name,
			email,
			password: hash,
		});
		if (createdUser) {
			return new Response("User created successfully", { status: 200 });
		} else {
			return new Response("Failed to create user", { status: 500 });
		}
	} catch (error) {
		console.error("API:(/api/auth/users) ENCOUNTERED ERROR: ", error);
		return new Response("Unexpected server error", { status: 500 });
	}
};
