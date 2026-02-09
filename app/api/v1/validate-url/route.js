
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const body = await req.json();
        const { url } = body;

        if (!url) {
            return NextResponse.json({ valid: false, message: 'URL is required' }, { status: 400 });
        }

        // Normalize URL for checking (simple check, maybe remove http/https/www)
        // For now, let's assume exact match or simple normalization if needed. 
        // User probably expects domain uniqueness.

        // Check if URL exists in any ACTIVE subscription
        const existingSubscription = await prisma.subscription.findFirst({
            where: {
                siteUrl: url
            }
        });

        if (existingSubscription) {
            return NextResponse.json({ valid: false, message: 'This URL is already in use by another active subscription.' });
        }

        return NextResponse.json({ valid: true });

    } catch (error) {
        console.error('URL Validation Error:', error);
        return NextResponse.json({ valid: false, message: 'Server error' }, { status: 500 });
    }
}
