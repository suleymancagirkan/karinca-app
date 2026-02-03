
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { createLog } from '@/lib/logger';

// GET: Fetch SEO Settings
export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        let settings = await prisma.sEOSettings.findFirst();

        if (!settings) {
            settings = await prisma.sEOSettings.create({
                data: {
                    metaTitle: 'Karinca App',
                }
            });
        }

        return NextResponse.json(settings);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST: Update SEO Settings
export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const data = await req.json();

        let settings = await prisma.sEOSettings.findFirst();

        if (settings) {
            settings = await prisma.sEOSettings.update({
                where: { id: settings.id },
                data: {
                    metaTitle: data.metaTitle,
                    metaDescription: data.metaDescription,
                    metaKeywords: data.metaKeywords,
                    ogImage: data.ogImage,
                    twitterHandle: data.twitterHandle,
                    googleAnalyticsId: data.googleAnalyticsId
                }
            });
        } else {
            settings = await prisma.sEOSettings.create({
                data: {
                    metaTitle: data.metaTitle,
                    metaDescription: data.metaDescription,
                    metaKeywords: data.metaKeywords,
                    ogImage: data.ogImage,
                    twitterHandle: data.twitterHandle,
                    googleAnalyticsId: data.googleAnalyticsId
                }
            });
        }

        // Log the action
        await createLog('SETTINGS_UPDATE_SEO', 'SEO settings updated', session.user.id);

        return NextResponse.json(settings);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
