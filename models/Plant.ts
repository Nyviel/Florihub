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
		description: {
			type: String,
		},
		images: [
			{
				type: String,
			},
		],
		is_featured: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

const Plant = models.Plant || model("Plant", PlantSchema);
export default Plant;
