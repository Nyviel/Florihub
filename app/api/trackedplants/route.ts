import TrackedPlant from "@/models/TrackedPlant";
import { authOptions } from "@/utils/authOptions";
import connectDB from "@/utils/database";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

// GET: /api/trackedplants
export const GET = async (request: NextRequest) => {
	try {
		await connectDB();

		const session = await getServerSession(authOptions);

		if (!session || !session?.user.id) {
			return new Response("Unauthorized", { status: 401 });
		}

		const page: number =
			Number(request.nextUrl.searchParams.get("page")) || 1;
		const pageSize: number =
			Number(request.nextUrl.searchParams.get("pageSize")) || 9;

		const skip: number = (page - 1) * pageSize;
		const total = await TrackedPlant.countDocuments();

		const trackedPlants = await TrackedPlant.find({
			userId: session.user.id,
		})
			.skip(skip)
			.limit(pageSize);

		return new Response(JSON.stringify({ trackedPlants, total }), {
			status: 200,
		});
	} catch (error) {
		console.error("API:(/api/trackedplants) ENCOUNTERED ERROR: ", error);
		return new Response("Unexpected server error", { status: 500 });
	}
};
