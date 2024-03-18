import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
    clerkId: string;
    profileCompleted: boolean;
    name: string;
    username: string;
    bio: string;
    email: string;
    profilePhotoUrl: string;
    savedThreads: string[];
    likedThreads: string[];
}

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        bio: {
            type: String,
        },
        clerkId: {
            type: String,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        profilePhotoUrl: {
            type: String,
        },

        profileCompleted: {
            type: Boolean,
            default: false,
        },

        savedThreads: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Thread",
                default: [],
            },
        ],

        likedThreads: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Thread",
                default: [],
            },
        ],
    },
    { timestamps: true }
);

userSchema.set("toJSON", {
    virtuals: true,
});

userSchema.set("toObject", {
    virtuals: true,
});

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
