import TrackedPlant from "@/models/TrackedPlant";
import { authOptions } from "@/utils/authOptions";
import connectDB from "@/utils/database";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
	try {
		await connectDB();

		const uid = request.nextUrl.searchParams.get("uid") || "";
		const pid = request.nextUrl.searchParams.get("pid") || "";

		const session = await getServerSession(authOptions);
		if (!session || !session.user) {
			return new Response("Unauthorized", { status: 401 });
		}

		if (session.user.id !== uid) {
			return new Response("Unauthorized", { status: 403 });
		}

		const trackedPlant = await TrackedPlant.findOne({
			userId: uid,
			plantId: pid,
		});
		if (trackedPlant) {
			return new Response(JSON.stringify({ tracking: true }), {
				status: 200,
			});
		} else {
			return new Response(JSON.stringify({ tracking: false }), {
				status: 200,
			});
		}
	} catch (error) {
		console.log("/api/trackedplants/istracked ERROR: ", error);
		return new Response("Unexpected server error", { status: 500 });
	}
};
