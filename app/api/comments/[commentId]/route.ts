import Comment from "@/server/models/Comment.model";
import { connectDb } from "@/server/utils/connectDb";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

interface Props {
    params: {
        commentId: string;
    };
}

export async function DELETE(req: NextRequest, { params }: Props) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { commentId } = params;
    await connectDb();
    const comment = await Comment.findOneAndDelete({ _id: commentId });
    return NextResponse.json(comment, { status: 200 });
}
