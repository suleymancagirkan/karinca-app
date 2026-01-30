import prisma from "@/lib/prisma"

export async function updateUser(userId, data) {
    try {
        const updateUser = await prisma.user.update({
            where: { id: userId },
            data: {
                email: data.email || undefined,
                username: data.username || undefined,
                email: data.email || undefined,
                fullname: data.fullname || undefined,
                password: data.password || undefined,
                bio: data.bio || undefined,
                image: data.image || undefined,
                updatedAt: new Date()
            }
        })

        return updateUser
    } catch (err) {
        throw new Error("Error: " + err)
    }
}

export async function getUserById(userId) {
    return await prisma.user.findUnique({ where: { id: userId } });
}

export async function getAllUsers() {
    return await prisma.user.findMany();
}