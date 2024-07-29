import Plant from "@/models/Plant";
import TrackedPlant, { TimelineEntry } from "@/models/TrackedPlant";
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

export const POST = async (request: NextRequest) => {
	try {
		await connectDB();
		const session = await getServerSession(authOptions);
		if (!session || !session.user) {
			return new Response("Unauthorized", { status: 401 });
		}

		const body = await request.json();
		const { plantId, userId } = body;
		console.log(userId, session.user.id);
		if (userId !== session.user.id) {
			return new Response("Unauthorized", { status: 403 });
		}

		const plant = await Plant.findOne({ _id: plantId });
		if (!plant) {
			return new Response("Plant not found", { status: 500 });
		}
		const { name, images, thumbnail } = plant;
		const newTrackedPlant = await TrackedPlant.create({
			plantId,
			userId,
			name,
			timeline: new TimelineEntry(),
			images,
			thumbnail,
		});
		if (newTrackedPlant) {
			return new Response("TrackedPlant added successfully", {
				status: 200,
			});
		} else {
			return new Response("Failed to add TrackedPlant", { status: 500 });
		}
	} catch (error) {
		console.error("API:(/api/trackedplants) ENCOUNTERED ERROR: ", error);
		return new Response("Unexpected server error", { status: 500 });
	}
};

export const DELETE = async (request: NextRequest) => {
	try {
		await connectDB();
		const session = await getServerSession(authOptions);
		if (!session || !session.user) {
			return new Response("Unauthorized", { status: 401 });
		}

		const plantId = request.nextUrl.searchParams.get("pid");
		const userId = request.nextUrl.searchParams.get("uid");

		if (userId !== session.user.id) {
			return new Response("Unauthorized", { status: 403 });
		}

		const plant = await Plant.findOne({ _id: plantId });
		if (!plant) {
			return new Response("Plant not found", { status: 500 });
		}
		const deletedStatus = await TrackedPlant.deleteOne({ plantId, userId });
		if (deletedStatus) {
			return new Response("Deleted entry sucessfully", {
				status: 200,
			});
		} else {
			return new Response("Failed to delete entry", { status: 500 });
		}
	} catch (error) {
		console.error("API:(/api/trackedplants) ENCOUNTERED ERROR: ", error);
		return new Response("Unexpected server error", { status: 500 });
	}
};
