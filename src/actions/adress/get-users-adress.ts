"use server"

import prisma from "@/lib/prisma"

export const getUserAdress = async (userId: string) => {
    try {
        const adress = await prisma.userAdress.findFirst({
            where: {
                userId
            }
        })

        if (!adress) return null

        const { countryId, address2, ...rest } = adress

        return {
            ...rest,
            country: countryId,
            address2: address2 ? address2 : "",
            city: "hola"
        }
    } catch (error) {
        console.log(error)
        return null
    }
}