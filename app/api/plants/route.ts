import connectDB from "@/config/database";
import Plant from "@/models/Plant";
import { NextRequest } from "next/server";

// GET: /api/plants
export const GET = async (request: NextRequest) => {
	try {
		await connectDB();

		const plants = await Plant.find();
		return new Response(JSON.stringify(plants), {
			status: 200,
		});
	} catch (error) {
		console.error("API:(/api/plants) ENCOUNTERED ERROR: ", error);
		return new Response("Unexpected server error", { status: 500 });
	}
};
