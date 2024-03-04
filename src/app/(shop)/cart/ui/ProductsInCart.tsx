"use client"
import { QuantitySelector } from '@/components'
import { useCartStore } from '@/store/cart/cart-store'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function ProductsInCart() {

    const productsInCart = useCartStore(state => state.cart)
    const updateProductQuantity = useCartStore(state => state.updateProductQuantity)
    const removeProductFromCart = useCartStore(state => state.removeProductFromCart)
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
                            <Link
                                className='hover:underline cursor-pointer'
                                href={`/product/${product.slug}`}
                            >
                                {product.size} - {product.title}
                            </Link>
                            <p>${product.price}</p>
                            <QuantitySelector
                                onQuantityChanged={(quantity) => updateProductQuantity(product, quantity)}
                                quantity={product.quantity}
                            />
                            <button
                                onClick={() => removeProductFromCart(product)}
                                className="underline mt-3">
                                Remover
                            </button>
                        </div>
                    </div>
                ))
            }
        </div >
    )
}
