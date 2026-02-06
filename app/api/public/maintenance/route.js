
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const settings = await prisma.generalSettings.findFirst({
            select: { maintenanceMode: true }
        });

        return NextResponse.json({ maintenanceMode: settings?.maintenanceMode || false });
    } catch (error) {
        return NextResponse.json({ maintenanceMode: false }, { status: 500 });
    }
}
