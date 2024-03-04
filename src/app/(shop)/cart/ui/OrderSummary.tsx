"use client"
import { useCartStore } from '@/store/cart/cart-store'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { currencyFormat } from '@/utils'

export default function OrderSummary() {

    const [laoder, setLoader] = useState(false)
    const { igv, itemsInCart, subTotal, total } = useCartStore(state => state.getSumaryInformation())
    useEffect(() => {
        setLoader(true)
    }, [])

    if (!laoder) return <p > Cargando...</p >

    return (
        <>
            <div className="grid grid-cols-2">
                <span>N# Prducts</span>
                <span className="text-rigth">
                    {itemsInCart === 1 ? "1 articulo" : `${itemsInCart} articulos`}
                </span>
                <span>Subtotal</span>
                <span className="text-rigth">
                    {currencyFormat(subTotal)}
                </span>
                <span>Inpuestos
                    <span className="text-sm">(18%)</span>
                </span>
                <span className="text-2xl mt-5">Total: </span>
                <span className="text-2xl mt-5">
                    {currencyFormat(total)}
                </span>
            </div>

            <div className="mt-5 mb-2 w-full">
                <Link
                    href="/checkout/address"
                    className="flex btn-primary justify-center"
                >
                    Checkout
                </Link>
            </div>
        </>
    )
}
