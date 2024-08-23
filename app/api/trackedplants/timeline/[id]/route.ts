import TrackedPlant from "@/models/TrackedPlant";
import { authOptions } from "@/utils/authOptions";
import connectDB from "@/utils/database";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
type paramsType = {
	id: string;
};
// DELETE: /api/trackedplants/:id?tpid=(tpid)
export const DELETE = async (
	request: NextRequest,
	{ params }: { params: paramsType }
) => {
	try {
		await connectDB();
		const session = await getServerSession(authOptions);
		if (!session || !session.user) {
			return new Response("Unauthorized", { status: 401 });
		}

		const { id } = params;
		const trackedPlantId = request.nextUrl.searchParams.get("tpid");

		if (!id) {
			return new Response("Bad request", { status: 400 });
		}

		const trackedPlant = await TrackedPlant.findOne({
			_id: trackedPlantId,
		});
		if (!trackedPlant) {
			return new Response("Not Found", { status: 404 });
		}

		if (trackedPlant.userId !== session.user.id) {
			return new Response("Unauthorized", { status: 401 });
		}

		const newTimeline = trackedPlant.timeline.filter(
			(timelineEntry) => timelineEntry._id !== id
		);

		const status = await TrackedPlant.findByIdAndUpdate(trackedPlantId, {
			...trackedPlant,
			timeline: newTimeline,
		});
		if (status) {
			return new Response("Deleted event sucessfully", {
				status: 200,
			});
		} else {
			return new Response("Failed to delete event", { status: 500 });
		}
	} catch (error) {
		console.error(
			"API:(/api/trackedplants/timeline/[id]) ENCOUNTERED ERROR: ",
			error
		);
		return new Response("Unexpected server error", { status: 500 });
	}
};
