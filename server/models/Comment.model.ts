import mongoose from "mongoose";

export interface IComment extends Document {
    content: string;
    thread: string;
    user: string;
}

const commentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        thread: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Thread",
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

commentSchema.set("toJSON", { virtuals: true });
commentSchema.set("toObject", { virtuals: true });

const Comment =
    mongoose.models.Comment ||
    mongoose.model<IComment>("Comment", commentSchema);

export default Comment;
