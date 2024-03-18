import Thread from "@/server/models/Thread.model";
import User from "@/server/models/User.model";
import { connectDb } from "@/server/utils/connectDb";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDb();
    const body = await req.json();
    const { title, content, image, tags } = body;

    const author = await User.findOne({ clerkId: userId });

    if (!author) {
        return NextResponse.json(
            { message: "User not found" },
            { status: 404 }
        );
    }

    const thread = await Thread.create({
        title,
        content,
        user: author._id,
        image,
        tags,
    });

    return NextResponse.json(thread, { status: 201 });
}

export async function GET() {
    await connectDb();
    const threads = await Thread.find({}).populate("user");
    return NextResponse.json(threads, { status: 200 });
}
