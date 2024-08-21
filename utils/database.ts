import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
	mongoose.set("strictQuery", true);
	mongoose.set("sanitizeFilter", true);

	if (connected) {
		console.error("DB: MONGODB IS ALREADY CONNECTED");
		return;
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI || "");
		connected = true;
		console.error("DB: MONGODB CONNECTED");
	} catch (error) {
		console.error("DB: FAILED TO CONNECT TO MONGODB, ERROR: ", error);
	}
};

export default connectDB;
