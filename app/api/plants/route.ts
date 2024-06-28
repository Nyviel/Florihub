import connectDB from "@/utils/database";
import Plant from "@/models/Plant";
import { NextRequest } from "next/server";

// GET: /api/plants
export const GET = async (request: NextRequest) => {
	try {
		await connectDB();

		const query = request.nextUrl.searchParams.get("search") || "";
		const page: number =
			Number(request.nextUrl.searchParams.get("page")) || 1;
		const pageSize: number =
			Number(request.nextUrl.searchParams.get("pageSize")) || 9;

		const skip: number = (page - 1) * pageSize;
		const total = await Plant.countDocuments();

		const queryPattern = new RegExp(query, "i");
		let q = {
			$or: [
				{ name: queryPattern },
				{ description: queryPattern },
				{ type: queryPattern },
				{ family: queryPattern },
				{ tags: queryPattern },
			],
		};

		const plants = await Plant.find(q).skip(skip).limit(pageSize);

		return new Response(JSON.stringify({ plants, total }), {
			status: 200,
		});
	} catch (error) {
		console.error("API:(/api/plants) ENCOUNTERED ERROR: ", error);
		return new Response("Unexpected server error", { status: 500 });
	}
};
