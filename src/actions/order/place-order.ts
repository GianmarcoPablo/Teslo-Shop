"use server"

import { auth } from "@/auth.config"
import type { Size } from "@/interfaces"
import type { Address } from "@/interfaces/address.interface"
import prisma from "@/lib/prisma"

interface ProductToOrder {
    productId: string
    quantity: number
    size: Size
}

export const placeOrder = async (productIds: ProductToOrder[], adress: Address) => {
    const sesion = await auth()
    const userId = sesion?.user?.id

    if (!userId) {
        return {
            ok: false,
            message: "No hay sesión de usuario activa"
        }
    }

    const products = await prisma.product.findMany({
        where: {
            id: {
                in: productIds.map(p => p.productId)
            }
        }
    })

    const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0)

    const { subtotal, tax, total } = productIds.reduce((totals, item) => {

        const productQuantity = item.quantity
        const product = products.find(product => product.id === item.productId)

        if (!product) throw new Error("Producto no encontrado")

        const subTotal = product?.price * productQuantity
        totals.subtotal += subTotal
        totals.tax += subTotal * 0.18
        totals.total += subTotal * 1.18

        return totals
    }, { subtotal: 0, tax: 0, total: 0 })

    //crear la transacción

}