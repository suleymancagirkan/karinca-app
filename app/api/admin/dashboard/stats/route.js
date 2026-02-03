
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) { // Allow any logged in user to see basics, or restrict to admin?
            // Dashboard is generally for the user or admin.
            // If this is the MAIN dashboard (/dashboard), it seems to be for Admin based on the sidebar "Users", "Store", etc.
            // But the user said "/dashboard/settings/general", which implies this is the admin area.
            // However, regular users might have a dashboard too.
            // The sidebar shows "Users", "Store", "Logs" which are definitely ADMIN links.
            // So I will assume this is an Admin Dashboard.
            // But I should check if the user is admin. The sidebar `UserBadge` suggests roles.
            // I'll proceed keeping it safe: if admin, full stats. if user, maybe limited?
            // The prompt says " Dashboard Settings General... fetching current settings, allowing admin to modify...".
            // So this is Admin Dashboard.
            if (session.user.role !== 'admin') {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
            }
        }

        // 1. Key Metrics
        const totalUsers = await prisma.user.count();
        const totalOrders = await prisma.order.count();
        const activeTickets = await prisma.ticket.count({
            where: {
                status: {
                    not: 'closed' // Assuming 'closed' is the status for closed tickets
                }
            }
        });

        // Revenue
        const revenueAgg = await prisma.order.aggregate({
            _sum: {
                price: true
            }
        });
        const totalRevenue = revenueAgg._sum.price || 0;

        // 2. Recent Activity (Last 5 users and Last 5 orders mixed)
        const recentUsers = await prisma.user.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            select: { id: true, fullname: true, createdAt: true }
        });

        const recentOrders = await prisma.order.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: { user: { select: { fullname: true } } }
        });

        // Combine and sort
        const activities = [
            ...recentUsers.map(u => ({
                id: u.id,
                type: 'user',
                title: `New user registered: ${u.fullname || 'Unknown'}`,
                time: u.createdAt,
                rawTime: new Date(u.createdAt).getTime()
            })),
            ...recentOrders.map(o => ({
                id: o.id,
                type: 'order',
                title: `New order: ${o.price} ${o.currency} by ${o.user?.fullname || 'Unknown'}`,
                time: o.createdAt,
                rawTime: new Date(o.createdAt).getTime()
            }))
        ].sort((a, b) => b.rawTime - a.rawTime).slice(0, 5);


        return NextResponse.json({
            stats: {
                users: totalUsers,
                orders: totalOrders,
                activeTickets,
                revenue: totalRevenue
            },
            activities
        });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
