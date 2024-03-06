"use client"
import { useCartStore } from '@/store/cart/cart-store'
import { currencyFormat } from '@/utils'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function ProductsInCart() {

    const productsInCart = useCartStore(state => state.cart)
    const [load, setLoad] = useState(false)

    useEffect(() => {
        setLoad(true)
    }, [])

    if (!load) {
        return <p>Loading...</p>
    }

    return (
        <div>
            {
                productsInCart.map(product => (
                    <div
                        key={`${product.slug}-${product.size}`}
                        className="flex mb-5"
                    >
                        <Image
                            src={`/products/${product.image}`}
                            width={100}
                            height={100}
                            style={{
                                width: "100px",
                                height: "100px"
                            }}
                            alt={product.title}
                            className="mr-5"
                        />

                        <div>
                            <span className='hover:underline'>
                                {product.size} - {product.title} ({product.quantity})
                            </span>
                            <p className='font-bold'>{currencyFormat(product.price * product.quantity)}</p>
                        </div>
                    </div>
                ))
            }
        </div >
    )
}
