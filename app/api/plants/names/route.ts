import connectDB from "@/config/database";
import Plant from "@/models/Plant";
import { NextRequest } from "next/server";

// GET: /api/plants/names
export const GET = async (request: NextRequest) => {
	try {
		await connectDB();

		const plantNames = await Plant.find({}, "name");
		return new Response(JSON.stringify(plantNames), {
			status: 200,
		});
	} catch (error) {
		console.error("API:(/api/plants/names) ENCOUNTERED ERROR: ", error);
		return new Response("Unexpected server error", { status: 500 });
	}
};
