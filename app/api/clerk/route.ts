import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import User, { IUser } from "@/server/models/User.model";
import Community, { ICommunity } from "@/server/models/Community.model";
const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || ``;

async function validateRequest(request: Request) {
    const payloadString = await request.text();
    const headerPayload = headers();

    const svixHeaders = {
        "svix-id": headerPayload.get("svix-id")!,
        "svix-timestamp": headerPayload.get("svix-timestamp")!,
        "svix-signature": headerPayload.get("svix-signature")!,
    };
    const wh = new Webhook(webhookSecret);
    return wh.verify(payloadString, svixHeaders) as WebhookEvent;
}
export async function POST(request: Request) {
    const payload = await validateRequest(request);
    const eventType = payload.type;

    switch (eventType) {
        case "user.created": {
            const eventData = payload.data;
            const name = `${eventData?.first_name} ${eventData.last_name}`;
            const username =
                eventData.username ||
                `${eventData.first_name.toLowerCase()}.${eventData.last_name.toLowerCase()}`;
            const id = eventData.id;
            const email = eventData.email_addresses[0].email_address;

            const newUser = {
                name,
                username,
                clerkId: id,
                email,
                profilePhotoUrl: eventData?.image_url,
                bio: "",
                profileCompleted: false,
            } as IUser;

            const existingUser = await User.findOne({ clerkId: id });
            if (!existingUser) {
                await User.create(newUser);
            }
        }

        case "organization.created": {
            const eventData = payload.data as any;
            const name = eventData?.name;
            const slug = eventData?.slug;
            const clerkId = eventData?.id;
            const imageUrl = eventData?.image_url;
            const createdBy = eventData?.created_by;
            const newCommunity = {
                name,
                clerkId,
                slug,
                imageUrl,
                createdBy: createdBy,
            } as ICommunity;

            await Community.create(newCommunity);
        }

        default:
            return Response.json({ message: "Received" });
    }

    return Response.json({ message: "Received" });
}
