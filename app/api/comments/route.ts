import { connectDb } from "@/server/utils/connectDb";
import { NextRequest, NextResponse } from "next/server";
import Comment from "@/server/models/Comment.model";
export async function POST(req: NextRequest) {
    await connectDb();

    const data = await req.json();

    const comment = new Comment({
        content: data.content,
        thread: data.thread,
        user: data.user,
    });
    await comment.save();
    return NextResponse.json({ message: "Comment created" }, { status: 201 });
}
