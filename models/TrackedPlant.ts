import { randomUUID } from "crypto";
import mongoose, { Document, Model, Schema, model, models } from "mongoose";
const { ObjectId } = mongoose.Types;
export type TimelineEntryEvent = "water" | "image" | null;

export class TimelineEntry {
	_id: String;
	date: Number;
	value: String;
	event: TimelineEntryEvent;

	constructor() {
		this._id = randomUUID();
		this.date = Date.now();
		this.value = "Started tracking";
		this.event = null;
	}
}

export interface ITrackedPlant extends Document {
	plantId: Schema.Types.ObjectId;
	userId: Schema.Types.ObjectId;
	name: String;
	timeline: TimelineEntry[];
	images: String[];
	thumbnail: String;
}

const TrackedPlantSchema = new Schema<ITrackedPlant>(
	{
		plantId: {
			type: Schema.Types.ObjectId,
		},
		userId: {
			type: Schema.Types.ObjectId,
		},
		name: {
			type: String,
			required: true,
		},
		timeline: [{ type: Schema.Types.Mixed }],
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

const TrackedPlant: Model<ITrackedPlant> =
	models.TrackedPlant ||
	model<ITrackedPlant>("TrackedPlant", TrackedPlantSchema);

export default TrackedPlant;
