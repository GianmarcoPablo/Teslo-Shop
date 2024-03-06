"use server"

import { Address } from "@/interfaces/address.interface"
import prisma from "@/lib/prisma"




export const setUserAdress = async (adress: Address, id: string) => {
    try {
        const saveAdress = await createOrReplaceAdress(adress, id)
        return {
            ok: true,
            adress: saveAdress
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: "No se pudo guardar la dirección."
        }
    }
}


const createOrReplaceAdress = async (adress: Address, id: string) => {
    try {
        const storeAdress = await prisma.userAdress.findUnique({
            where: {
                userId: id
            }
        })

        const adressToSave = {
            userId: id,
            address: adress.address,
            address2: adress.address2,
            countryId: adress.country,
            firstName: adress.firstName,
            lastName: adress.lastName,
            phone: adress.phone,
            postalCode: adress.postalCode,
            city: adress.city
        }

        if (!storeAdress) {
            const newAdress = await prisma.userAdress.create({
                data: {
                    ...adressToSave,
                }
            })
            return newAdress
        }

        const updatedAdress = await prisma.userAdress.update({
            where: {
                userId: id
            },
            data: {
                ...adressToSave,
            }
        })

        console.log(updatedAdress)

        return updatedAdress

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: "No se pudo guardar la dirección."
        }
    }
}