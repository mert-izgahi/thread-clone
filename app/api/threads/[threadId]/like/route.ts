import Thread from "@/server/models/Thread.model";
import User from "@/server/models/User.model";
import { connectDb } from "@/server/utils/connectDb";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

interface Props {
    params: {
        threadId: string;
    };
}

export async function POST(req: NextRequest, { params }: Props) {
    const { threadId } = params;
    const { userId } = await auth();
    await connectDb();

    const thread = await Thread.findById(threadId);

    if (!thread) {
        return NextResponse.json(
            { message: "Thread not found" },
            { status: 404 }
        );
    }

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

    if (!user.likedThreads.includes(threadId)) {
        user.likedThreads.push(threadId);
        thread.likesCount++;
    } else {
        user.likedThreads.pop(threadId);
        if (thread.likesCount > 0) thread.likesCount--;
    }

    await user.save();
    await thread.save();

    return NextResponse.json(user, { status: 200 });
}
