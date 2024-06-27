import { Schema, model, models } from "mongoose";

const PlantSchema = new Schema(
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

const Plant = models.Plant || model("Plant", PlantSchema);
export default Plant;
