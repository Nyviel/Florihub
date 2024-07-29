import { Document, Model } from "mongoose";
import { Schema, model, models } from "mongoose";

export interface IPlant extends Document {
	name: string;
	type: string;
	family: string;
	description: string;
	images: string[];
	tags: string[];
	light: string[];
	soil: string[];
	water: string;
	maintenance: string;
	toxicity: string;
	height: number;
	width: number;
	bloom: string[];
	thumbnail: string;
}

const PlantSchema = new Schema<IPlant>(
	{
		name: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		family: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		images: [
			{
				type: String,
			},
		],
		tags: [
			{
				type: String,
			},
		],
		light: [
			{
				type: String,
			},
		],
		soil: [
			{
				type: String,
			},
		],
		water: {
			type: String,
			required: true,
		},
		maintenance: {
			type: String,
			required: true,
		},
		toxicity: {
			type: String,
			required: true,
		},
		height: {
			type: Number,
			required: true,
		},
		width: {
			type: Number,
			required: true,
		},
		bloom: [
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

const Plant: Model<IPlant> =
	models.Plant || model<IPlant>("Plant", PlantSchema);
export default Plant;
