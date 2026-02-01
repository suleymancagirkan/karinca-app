import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(categories);
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
        const { name, slug, description } = body;

        const category = await prisma.category.create({
            data: {
                name,
                slug,
                description
            }
        });

        return NextResponse.json(category);
    } catch (error) {
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
        const { id, name, slug, description } = body;

        const category = await prisma.category.update({
            where: { id },
            data: {
                name,
                slug,
                description
            }
        });

        return NextResponse.json(category);
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

        await prisma.category.delete({
            where: { id }
        });

        return new NextResponse("Category deleted", { status: 200 });
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
}
