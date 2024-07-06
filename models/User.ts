import { Model, Schema, model, models } from "mongoose";

export interface IUser extends Document {
	email: string;
	name: string;
	password: string;
	isAdmin: boolean;
}

const UserSchema = new Schema<IUser>(
	{
		email: {
			type: String,
			unique: true,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

const User: Model<IUser> = models.User || model<IUser>("User", UserSchema);
export default User;
