import Comment from "@/server/models/Comment.model";
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

export async function GET(req: NextRequest, { params }: Props) {
    const { threadId } = params;
    await connectDb();
    const thread = await Thread.findOne({ _id: threadId })
        .populate({
            path: "user",
            model: User,
        })
        .populate({
            path: "comments",
            model: Comment,
        });
    return NextResponse.json(thread, { status: 200 });
}

export async function DELETE(req: NextRequest, { params }: Props) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { threadId } = params;
    await connectDb();

    const thread = await Thread.findOneAndDelete({ _id: threadId });

    const user = await User.findOne({ clerkId: userId });
    if (user) {
        user.likedThreads = user.likedThreads.filter(
            (id: string) => id !== threadId
        );

        user.savedThreads = user.savedThreads.filter(
            (id: string) => id !== threadId
        );

        await user.save();
    }
    return NextResponse.json(thread, { status: 200 });
}

export async function PUT(req: NextRequest, { params }: Props) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { threadId } = params;
    await connectDb();
    const body = await req.json();
    const { title, content, image, tags } = body;
    const thread = await Thread.findOneAndUpdate(
        { _id: threadId },
        {
            title,
            content,
            image,
            tags,
        }
    );
    return NextResponse.json(thread, { status: 200 });
}
