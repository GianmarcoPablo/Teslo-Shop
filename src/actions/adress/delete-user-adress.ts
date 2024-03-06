"use server"

import prisma from "@/lib/prisma"

export const deleteUserAdress = async (userId: string) => {
    try {
        const deleted = await prisma.userAdress.delete({
            where: {
                userId
            }
        })

        return { ok: true }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: "No se pudo eliminar la dirección del usuario."
        }
    }
}