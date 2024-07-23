import { Schema, model, models } from "mongoose";

type TimelineEntryEvent = "water" | "image" | null;

class TimelineEntry {
	date: Number;
	value: String;
	event: TimelineEntryEvent;

	constructor() {
		this.date = Date.now();
		this.value = "";
		this.event = null;
	}
}

const TrackedPlantSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		timeline: [{ type: TimelineEntry }],
		images: [
			{
				type: String,
			},
		],
		thumbnail: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const TrackedPlant =
	models.TrackedPlant || model("TrackedPlant", TrackedPlantSchema);
export default TrackedPlant;
