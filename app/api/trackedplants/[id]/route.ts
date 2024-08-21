import Plant from "@/models/Plant";
import TrackedPlant from "@/models/TrackedPlant";
import { authOptions } from "@/utils/authOptions";
import connectDB from "@/utils/database";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

type paramsType = {
	id: string;
};

//GET: /api/trackedplants/:id
export const GET = async (
	request: NextApiRequest,
	{ params }: { params: paramsType }
) => {
	try {
		await connectDB();
		const session = await getServerSession(authOptions);
		if (!session || !session.user) {
			return new Response("Unauthorized", { status: 401 });
		}

		const { id } = params;
		if (!id) {
			return new Response("Invalid request", { status: 400 });
		}

		const trackedPlant = await TrackedPlant.findOne({ _id: id });
		if (!trackedPlant) {
			return new Response("Not found", { status: 404 });
		}

		if (trackedPlant.userId.toString() !== session.user.id) {
			return new Response("Unauthorized", { status: 403 });
		}

		return new Response(JSON.stringify(trackedPlant), { status: 200 });
	} catch (error) {
		console.error(
			"API:(/api/trackedplants/[id]) GET: ENCOUNTERED ERROR: ",
			error
		);
		return new Response("Unexpected Server Error", { status: 500 });
	}
};

// DELETE: /api/trackedplants/:id?uid=(uid)
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
		const userId = request.nextUrl.searchParams.get("uid");

		if (!id) {
			return new Response("Bad request", { status: 400 });
		}

		if (userId !== session.user.id) {
			return new Response("Unauthorized", { status: 403 });
		}

		const deletedStatus = await TrackedPlant.deleteOne({ _id: id });
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
