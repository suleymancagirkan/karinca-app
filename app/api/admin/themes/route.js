import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
    try {
        const themes = await prisma.theme.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(themes);
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
        const { name, url, description, icon } = body;

        const theme = await prisma.theme.create({
            data: {
                name,
                url,
                description,
                icon
            }
        });

        return NextResponse.json(theme);
    } catch (error) {
        console.error('POST Theme Error:', error);
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
        const { id, name, url, description, icon } = body;

        const theme = await prisma.theme.update({
            where: { id },
            data: {
                name,
                url,
                description,
                icon
            }
        });

        return NextResponse.json(theme);
    } catch (error) {
        console.error('PUT Theme Error:', error);
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

        await prisma.theme.delete({
            where: { id }
        });

        return new NextResponse("Theme deleted", { status: 200 });
    } catch (error) {
        console.error('DELETE Theme Error:', error);
        return new NextResponse(error.message, { status: 500 });
    }
}
