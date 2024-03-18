import Thread from "@/server/models/Thread.model";
import User from "@/server/models/User.model";
import { connectDb } from "@/server/utils/connectDb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const GET = async (req: NextResponse) => {
    const { userId } = auth();

    await connectDb();

    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({ clerkId: userId })
        .populate({
            path: "savedThreads",
            model: Thread,
        })
        .populate({
            path: "likedThreads",
            model: Thread,
        });

    return NextResponse.json(user, { status: 200 });
};

export const PUT = async (req: NextResponse) => {
    const { userId } = auth();

    await connectDb();

    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
        return NextResponse.json(
            { message: "User not found" },
            { status: 404 }
        );
    }

    const data = await req.json();

    user.name = data.name;
    user.username = data.username;
    user.bio = data.bio;

    if (data.profilePhotoUrl) {
        user.profilePhotoUrl = data.profilePhotoUrl;
    }

    if (data.profileCompleted) {
        user.profileCompleted = data.profileCompleted;
    }
    await user.save();

    return NextResponse.json(user, { status: 200 });
};
