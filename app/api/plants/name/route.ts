import Plant from "@/models/Plant";
import connectDB from "@/utils/database";
import { NextRequest } from "next/server";

// GET: api/plants/name
export const GET = async (req: NextRequest) => {
	try {
		await connectDB();

		const query = req.nextUrl.searchParams.get("q") || "";
		console.log("Query: ", query);
		const queryPattern = new RegExp(query, "i");
		let q = {
			$or: [{ name: queryPattern }],
		};

		const plant = await Plant.findOne(q);

		if (!plant) {
			return new Response("No plant found", { status: 404 });
		}
		return new Response(JSON.stringify(plant), { status: 200 });
	} catch (error) {
		console.error("API:(/api/plants/name) ENCOUNTERED ERROR: ", error);
		return new Response("Unexpected server error", { status: 500 });
	}
};
