
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { createLog } from '@/lib/logger';

// GET: Fetch General Settings
export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        // Try to find the first settings record
        let settings = await prisma.generalSettings.findFirst();

        // If no settings exist, create default
        if (!settings) {
            settings = await prisma.generalSettings.create({
                data: {
                    siteName: 'Karinca App',
                    maintenanceMode: false
                }
            });
        }

        return NextResponse.json(settings);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST: Update General Settings
export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const data = await req.json();

        // We assume there is only one settings row, so we update the first one or create if missing
        let settings = await prisma.generalSettings.findFirst();

        if (settings) {
            settings = await prisma.generalSettings.update({
                where: { id: settings.id },
                data: {
                    siteName: data.siteName,
                    siteDescription: data.siteDescription,
                    logoUrl: data.logoUrl,
                    faviconUrl: data.faviconUrl,
                    maintenanceMode: data.maintenanceMode
                }
            });
        } else {
            settings = await prisma.generalSettings.create({
                data: {
                    siteName: data.siteName,
                    siteDescription: data.siteDescription,
                    logoUrl: data.logoUrl,
                    faviconUrl: data.faviconUrl,
                    maintenanceMode: data.maintenanceMode || false
                }
            });
        }

        // Maintenance is now fetched dynamically by middleware from DB API, so no file update needed.

        // Log the action
        await createLog('SETTINGS_UPDATE_GENERAL', `General settings updated. Maintenance Mode: ${data.maintenanceMode}`, session.user.id);

        return NextResponse.json(settings);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
