import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getAllUsers } from '@/services/user';

export async function GET() {
    try {
        const users = await getAllUsers();
        return NextResponse.json(users);
    } catch (error) {
        console.error("Get Users Error:", error);
        return new NextResponse(error.message || 'Internal Error', { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const adminUser = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!adminUser || adminUser.role !== 'admin') {
            return new NextResponse('Forbidden: Admin access required', { status: 403 });
        }

        const body = await request.json();
        const { id, fullname, username, email, role, status } = body;

        if (!id) {
            return new NextResponse('User ID is required', { status: 400 });
        }

        const conflict = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: username },
                    { email: email }
                ],
                NOT: {
                    id: id
                }
            }
        });

        if (conflict) {
            return new NextResponse('Username or Email already in use', { status: 409 });
        }

        const updatedUser = await prisma.user.update({
            where: { id: id },
            data: {
                fullname,
                username,
                email,
                role,
            }
        });

        return NextResponse.json(updatedUser);

    } catch (error) {
        console.error("Admin Update User Error:", error);
        return new NextResponse(error.message || 'Internal Error', { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const adminUser = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!adminUser || adminUser.role !== 'admin') {
            return new NextResponse('Forbidden: Admin access required', { status: 403 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return new NextResponse('User ID is required', { status: 400 });
        }

        if (id === adminUser.id) {
            return new NextResponse('Cannot delete your own admin account', { status: 400 });
        }

        await prisma.user.delete({
            where: { id: id }
        });

        return new NextResponse(JSON.stringify({ message: 'User deleted successfully' }), { status: 200 });

    } catch (error) {
        console.error("Admin Delete User Error:", error);
        return new NextResponse(error.message || 'Internal Error', { status: 500 });
    }
}

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const adminUser = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!adminUser || adminUser.role !== 'admin') {
            return new NextResponse('Forbidden: Admin access required', { status: 403 });
        }

        const body = await request.json();
        const { fullname, username, email, password, role } = body;

        if (!username || !email || !password) {
            return new NextResponse('Missing required fields', { status: 400 });
        }

        const conflict = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: username },
                    { email: email }
                ]
            }
        });

        if (conflict) {
            return new NextResponse('Username or Email already in use', { status: 409 });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                fullname,
                username,
                email,
                password: hashedPassword,
                role: role || 'user',
            }
        });

        return NextResponse.json(newUser, { status: 201 });

    } catch (error) {
        console.error("Admin Create User Error:", error);
        return new NextResponse(error.message || 'Internal Error', { status: 500 });
    }
}
