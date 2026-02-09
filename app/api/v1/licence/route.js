
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const body = await req.json();
        const { url } = body;

        if (!url) {
            return NextResponse.json({ valid: false, message: 'URL is required' }, { status: 400 });
        }

        // Normalize URL - remove protocol and trailing slash for consistent matching
        // In PurchaseModal we cleaned it before sending, but good to be safe here too
        // or just match what's stored in DB (which should be clean domain)
        let cleanUrl = url.replace(/(^\w+:|^)\/\//, '').replace(/\/+$/, '');

        // Also remove www. if present? It depends on how it's stored.
        // Let's assume stored as 'example.com' or 'sub.example.com'.
        // If user enters www.example.com, we might want to check both or strip www.
        // For now, let's keep it simple and just rely on exact match or what we have.
        // Actually, let's try to match exactly how we saved it.

        const subscription = await prisma.subscription.findFirst({
            where: {
                siteUrl: cleanUrl,
                status: 'ACTIVE'
            },
            include: {
                tier: true,
                user: {
                    select: {
                        fullname: true,
                        username: true
                    }
                }
            }
        });

        if (subscription) {
            return NextResponse.json({
                valid: true,
                message: 'License found!',
                details: {
                    tier: subscription.tier.name,
                    expiresAt: subscription.endDate,
                    owner: subscription.user.fullname || subscription.user.username || 'Hidden'
                }
            });
        } else {
            return NextResponse.json({ valid: false, message: 'No active license found for this URL.' });
        }

    } catch (error) {
        console.error('License Check Error:', error);
        return NextResponse.json({ valid: false, message: 'Server error during verification' }, { status: 500 });
    }
}
