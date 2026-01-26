import prisma from "@/lib/prisma";

export default class User {
    static async getAll() {
        return prisma.user.findAll();
    }

    static async getUserById(id) {
        return prisma.user.findUnique({ where: { id } })
    }

    static async create() {
        return prisma.user.create({ data });
    }

    static async update(id, data) {
        return prisma.user.update({ where: { id }, data })
    }

    static async delete(id) {
        return prisma.user.delete({ where: { id } })
    }
}