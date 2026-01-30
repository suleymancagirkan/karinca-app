import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getAllUsers, updateUser } from '@/services/user';
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function PUT(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.id) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const body = await request.json();
        const updateData = { ...body };

        // Şifre değiştirme işlemi varsa
        if (body.currentPassword && body.newPassword) {
            // 1. Kullanıcının mevcut verisini (ve şifresini) çek
            const user = await prisma.user.findUnique({
                where: { id: session.user.id }
            });

            if (!user || !user.password) {
                return new NextResponse("User not found or password not set", { status: 404 });
            }

            const isPasswordValid = await bcrypt.compare(body.currentPassword, user.password);

            if (!isPasswordValid) {
                return new NextResponse("Mevcut şifre hatalı!", { status: 400 });
            }

            const hashedPassword = await bcrypt.hash(body.newPassword, 10);

            updateData.password = hashedPassword;
            delete updateData.currentPassword;
            delete updateData.newPassword;
        }

        const updatedUser = await updateUser(session.user.id, updateData);

        return NextResponse.json(updatedUser);

    } catch (error) {
        console.error("Update Error:", error);
        return new NextResponse(error.message || 'Internal Error', { status: 500 });
    }
}

export async function GET() {
    try {
        const users = await getAllUsers();
        return NextResponse.json(users);
    } catch (error) {
        console.error("Get Users Error:", error);
        return new NextResponse(error.message || 'Internal Error', { status: 500 });
    }
}