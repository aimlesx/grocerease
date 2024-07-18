"use server";

import prisma from "@/lib/db";

export async function createList(name: string) {
    return prisma.list.create({
        data: {name},
    });
}

export async function fetchList(id: number) {
    return prisma.list.findUnique({
        where: {id},
        include: { items: true },
    });
}

export async function fetchLists() {
    return prisma.list.findMany();
}

export async function updateItem(id: number, done: boolean) {
    console.log('updating item', id, done);

    return prisma.item.update({
        where: {id},
        data: {done},
    });
}

export async function updateItems(items: { id: number, done: boolean }[]) {
    return prisma.item.updateMany({
        where: { id: { in: items.map(i => i.id) } },
        data: items.map(i => ({ id: i.id, done: i.done })),
    });
}