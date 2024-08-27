import TrackedPlant, {
	TimelineEntry,
	TimelineEntryEvent,
} from "@/models/TrackedPlant";
import { authOptions } from "@/utils/authOptions";
import connectDB from "@/utils/database";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import { randomUUID } from "crypto";

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Disable Next.js's default body parser to handle multipart/form-data
export const config = {
	api: {
		bodyParser: false,
	},
};

// Promisify the middleware to use it in an async function
const runMiddleware = (req: any, res: any, fn: any) => {
	return new Promise((resolve, reject) => {
		fn(req, res, (result: any) => {
			if (result instanceof Error) {
				return reject(result);
			}
			resolve(result);
		});
	});
};

export const POST = async (request: NextRequest) => {
	try {
		await connectDB();
		const session = await getServerSession(authOptions);
		if (!session || !session.user) {
			return new Response("Unauthorized", { status: 401 });
		}

		const data = await request.formData();
		const image = data.get("image");
		const eventTypeRaw: string | undefined = data
			.get("eventType")
			?.toString();
		const eventType: TimelineEntryEvent =
			eventTypeRaw === "water"
				? "water"
				: eventTypeRaw === "image"
				? "image"
				: null;

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

		if (eventType === "image") {
			if (!image || !(image instanceof File)) {
				return new Response("No image file provided", { status: 400 });
			}

			const buffer = Buffer.from(await image.arrayBuffer());
			const filename = `${randomUUID()}${path.extname(image.name)}`;
			const filePath = path.join(
				process.cwd(),
				"public",
				"uploads",
				filename
			);

			try {
				await fs.mkdir(path.join(process.cwd(), "public", "uploads"), {
					recursive: true,
				});
				await fs.writeFile(filePath, buffer);
			} catch (error) {
				console.error("Error uploading file:", error);
				return new Response("Error uploading file", { status: 500 });
			}

			newTimelineEntry.value = `/uploads/${filename}`;
		}

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
