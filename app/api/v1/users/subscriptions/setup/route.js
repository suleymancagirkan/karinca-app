import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { id, siteUrl } = body;

        if (!id || !siteUrl) {
            return new NextResponse("Missing fields", { status: 400 });
        }

        // Check if subscription belongs to user
        const subscription = await prisma.subscription.findUnique({
            where: { id, userId: session.user.id }
        });

        if (!subscription) {
            return new NextResponse("Subscription not found", { status: 404 });
        }

        // Update Subscription
        const updatedSubscription = await prisma.subscription.update({
            where: { id },
            data: { siteUrl }
        });

        // Also update related Order if possible (optional but good for syncing)
        // Find the latest order for this subscription/tier? Or just leave it on subscription.
        // Let's keep it simple and just update subscription for now as that's the active license.

        return NextResponse.json(updatedSubscription);

    } catch (error) {
        console.error("SETUP_SERVICE_ERROR", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
