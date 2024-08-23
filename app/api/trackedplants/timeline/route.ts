import TrackedPlant, { TimelineEntry } from "@/models/TrackedPlant";
import { authOptions } from "@/utils/authOptions";
import connectDB from "@/utils/database";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
	try {
		await connectDB();
		const session = await getServerSession(authOptions);
		if (!session || !session.user) {
			return new Response("Unauthorized", { status: 401 });
		}

		const body = await request.json();
		const { eventType, image } = body;

		const trackedPlantId = request.nextUrl.searchParams.get("tpid");

		const trackedPlant = await TrackedPlant.findOne({
			_id: trackedPlantId,
		});

		if (!trackedPlant) {
			return new Response("Plant not found", { status: 404 });
		}
		if (trackedPlant.userId.toString() !== session.user.id) {
			return new Response("Unauthorized", { status: 401 });
		}

		let newTimelineEntry = new TimelineEntry();
		newTimelineEntry.event = eventType;
		newTimelineEntry.value = image;

		const newTimeline = trackedPlant.timeline.push(newTimelineEntry);

		const status = await TrackedPlant.findByIdAndUpdate(trackedPlantId, {
			...trackedPlant,
			timeline: newTimeline,
		});

		if (status) {
			return new Response("Added event sucessfully", {
				status: 200,
			});
		} else {
			return new Response("Failed to add event", { status: 500 });
		}
	} catch (error) {
		console.error(
			"API:(/api/trackedplants/timeline) ENCOUNTERED ERROR: ",
			error
		);
		return new Response("Unexpected server error", { status: 500 });
	}
};
