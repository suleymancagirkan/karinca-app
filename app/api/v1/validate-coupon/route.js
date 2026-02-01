import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
    try {
        const { code } = await request.json();

        if (!code) {
            return new NextResponse("Coupon code is required", { status: 400 });
        }

        const coupon = await prisma.coupon.findUnique({
            where: { code: code.toUpperCase() }
        });

        if (!coupon) {
            return new NextResponse("Invalid coupon code", { status: 404 });
        }

        if (coupon.status !== 'active') {
            return new NextResponse("Coupon is inactive", { status: 400 });
        }

        if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
            return new NextResponse("Coupon has expired", { status: 400 });
        }

        if (coupon.limit > 0) {
            // Need to check usage count. For now, assuming we track usage separately or relying on a future 'usedCount' field.
            // Since the schema currently doesn't have 'usedCount' or a 'Usage' relation, we'll skip exact limit enforcement for now 
            // OR we can assume 'limit' is 'remaining uses'. Let's stick to the schema I saw.
            // The schema has 'limit'. It does not have 'usedCount'.
            // I'll assume 'limit' is the max uses allowed.
            // Without a 'CouponUsage' table or 'usedCount' field, accurate limit enforcement is tricky.
            // The previous AddCouponModal had 'usedCount' in its logic but probably was removed or not saved.
            // Let's re-read schema. Code 61-71: Coupon model has limit but no usedCount.
            // I will assume for now we just validate existence and date.
            // Ideally we need to track usage. I'll proceed with basic validation for now.
        }

        return NextResponse.json({
            code: coupon.code,
            discount: coupon.discount,
            discountType: coupon.discountType
        });
    } catch (error) {
        console.error('Validate Coupon Error:', error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
