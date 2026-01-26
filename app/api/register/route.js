import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function POST(request) {
    try {
        const body = await request.json();
        const { fullname, username, email, password } = body;

        if (!fullname || !username || !email || !password) {
            return new NextResponse('Missing Fields', { status: 400 });
        }

        const exist = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: email },
                    { username: username }
                ]
            }
        });

        if (exist) {
            return new NextResponse('User already exists', { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                fullname,
                username,
                email,
                password: hashedPassword,
                // name property removed as it does not exist in the schema
            }
        });

        return NextResponse.json(user);

    } catch (error) {
        console.log(error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
