"use client"

import { placeOrder } from "@/actions"
import { useAdressStore } from "@/store/address/address-store"
import { useCartStore } from "@/store/cart/cart-store"
import { currencyFormat } from "@/utils"
import clsx from "clsx"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function PlaceOrder() {

    const [loaded, setLoaded] = useState(false)
    const [isPlacingOrder, setIsPlacingOrder] = useState(false)

    const address = useAdressStore(state => state.address)
    const { igv, itemsInCart, subTotal, total } = useCartStore(state => state.getSumaryInformation())
    const cart = useCartStore(state => state.cart)

    useEffect(() => {
        setLoaded(true)
    }, [])

    const onPlaceOrder = async () => {
        setIsPlacingOrder(true)

        const productsToOrder = cart.map(product => ({
            productId: product.id,
            quantity: product.quantity,
            size: product.size
        }))


        const rpta = await placeOrder(productsToOrder, address)
        console.log(rpta)
    }

    if (!loaded) {
        return <p>Loading...</p>
    }

    return (
        <div className="bg-white rounded-xl p-7 ">

            <h2 className="text-2xl mb-2">Dirección de entrega</h2>
            <div className="mb-10">
                <p>
                    {address.firstName} {address.lastName}
                </p>
                <p>
                    {address.address}
                </p>
                <p>
                    {address.address2}
                </p>
                <p>
                    {address.postalCode}
                </p>
                <p>
                    {address.city} {address.country}
                </p>
                <p>
                    {address.phone}
                </p>
            </div>

            <div
                className="w-full h-0.5 rounded bg-gray-200 mb-10"
            />

            <h2 className="text-2xl mb-2"> Resumen de orden</h2>
            <div>
                <div className="flex justify-between">
                    <p>N# Productos: </p> <p>{itemsInCart === 1 ? "1 articulo" : `${itemsInCart} articulos`}</p>
                </div>
                <div className="flex justify-between">
                    <p>Subtotal: </p> <p>{currencyFormat(subTotal)}</p>
                </div>
                <div className="flex justify-between">
                    <p>Impuestos (18%): </p> <p>{currencyFormat(igv)}</p>
                </div>
                <div className="flex justify-between">
                    <p>Total: </p> <p>{currencyFormat(total)}</p>
                </div>
            </div>

            <div className="mt-5 mb-2 w-full">

                <p className="mb-5">
                    <span className="text-xs">
                        Al hacer click en "Colocar orden" aceptas nuestros <a href="#" className="underline">Términos y condiciones</a> y <a href="#" className="underline">Política de privacidad</a>
                    </span>
                </p>

                {/* <p className="text-red-500">Error de creación</p> */}

                <button
                    //href="/orders/123"
                    onClick={onPlaceOrder}
                    className={clsx({
                        "btn-primary": !isPlacingOrder,
                        "btn-disabled": isPlacingOrder
                    })}
                >
                    Colocar Orden
                </button>
            </div>
        </div>
    )
}
