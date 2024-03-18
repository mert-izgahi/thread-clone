import mongoose, { Document } from "mongoose";

export interface IThread extends Document {
    title: string;
    content: string;
    image: string;
    tags: string[];
    comments: string[];
    user: string;
    likesCount: number;
    createdAt: Date;
    updatedAt: Date;
}

const threadSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        tags: {
            type: [String],
            required: true,
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment",
                default: [],
            },
        ],
        user: {
            type: String,
            required: true,
            ref: "User",
        },

        likesCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

threadSchema.set("toJSON", { virtuals: true });
threadSchema.set("toObject", { virtuals: true });

const Thread =
    mongoose.models.Thread || mongoose.model<IThread>("Thread", threadSchema);

export default Thread;
