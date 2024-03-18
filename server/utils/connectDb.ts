import mongoose from "mongoose";

let isConnected = false;

export const connectDb = async () => {
    if (isConnected) {
        return;
    }

    try {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
        isConnected = true;
        console.log("Connected to MongoDb");
    } catch (error) {
        console.log(error);
    }

    return;
};
