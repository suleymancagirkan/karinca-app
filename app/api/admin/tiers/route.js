import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
    try {
        const tiers = await prisma.tier.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                category: true // Include category data
            }
        });
        return NextResponse.json(tiers);
    } catch (error) {
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
        const { name, description, priceMonthly, priceYearly, categoryId, features } = body;

        const tier = await prisma.tier.create({
            data: {
                name,
                description,
                priceMonthly: parseFloat(priceMonthly),
                priceYearly: parseFloat(priceYearly),
                categoryId,
                features
            },
            include: {
                category: true
            }
        });

        return NextResponse.json(tier);
    } catch (error) {
        console.error('POST Tier Error:', error);
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
        const { id, name, description, priceMonthly, priceYearly, categoryId, features } = body;

        const tier = await prisma.tier.update({
            where: { id },
            data: {
                name,
                description,
                priceMonthly: parseFloat(priceMonthly),
                priceYearly: parseFloat(priceYearly),
                categoryId,
                features
            },
            include: {
                category: true
            }
        });

        return NextResponse.json(tier);
    } catch (error) {
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

        await prisma.tier.delete({
            where: { id }
        });

        return new NextResponse("Tier deleted", { status: 200 });
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
}
