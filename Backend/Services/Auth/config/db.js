import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log(
            "Mongo URL starts with:",
            process.env.MONGODB_URL?.slice(0, 20)
        );

        await mongoose.connect(process.env.MONGODB_URL);

        console.log("db connected");
    } catch (error) {
        console.log("db error:", error);
        throw error;
    }
};

export default connectDB;