import User from "@/models/User";
import connectDB from "@/utils/database";
import bcrypt from "bcrypt";

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
