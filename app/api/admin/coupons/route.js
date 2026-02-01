import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const coupons = await prisma.coupon.findMany({
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(coupons);
    } catch (error) {
        console.error('GET Coupon Error:', error);
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await request.json();
        const { code, description, discount, discountType, limit, expiresAt } = body;

        // Basic validation
        if (!code || !discount || !discountType || !expiresAt) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        // Check if code already exists
        const existingCoupon = await prisma.coupon.findUnique({
            where: { code }
        });

        if (existingCoupon) {
            return new NextResponse("Coupon code already exists", { status: 400 });
        }

        const coupon = await prisma.coupon.create({
            data: {
                code,
                description,
                discount: parseFloat(discount),
                discountType,
                limit: parseInt(limit) || 0,
                expiresAt: new Date(expiresAt),
                status: 'active'
            }
        });

        return NextResponse.json(coupon);
    } catch (error) {
        console.error('POST Coupon Error:', error);
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await request.json();
        const { id, code, description, discount, discountType, limit, expiresAt, status } = body;

        const coupon = await prisma.coupon.update({
            where: { id },
            data: {
                code,
                description,
                discount: parseFloat(discount),
                discountType,
                limit: parseInt(limit) || 0,
                expiresAt: new Date(expiresAt),
                status
            }
        });

        return NextResponse.json(coupon);
    } catch (error) {
        console.error('PUT Coupon Error:', error);
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        await prisma.coupon.delete({
            where: { id }
        });

        return new NextResponse("Coupon deleted", { status: 200 });
    } catch (error) {
        console.error('DELETE Coupon Error:', error);
        return new NextResponse(error.message, { status: 500 });
    }
}
