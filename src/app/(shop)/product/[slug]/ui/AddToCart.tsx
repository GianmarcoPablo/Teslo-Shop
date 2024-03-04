"use client"

import { QuantitySelector, SizeSelector } from '@/components'
import { CartProduct, Product, Size } from '@/interfaces'
import { useCartStore } from '@/store/cart/cart-store'
import React, { useState } from 'react'

interface Props {
    product: Product
}

export default function AddToCart({ product }: Props) {

    const addProductTocart = useCartStore(state => state.addProducToCart)

    const [size, setSize] = useState<Size | undefined>()
    const [quantity, setQuantity] = useState<number>(1)
    const [posted, setPosted] = useState<boolean>(false)

    const addToCart = () => {
        setPosted(true)
        if (!size) return
        const cartProduct: CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            quantity,
            size,
            image: product.images[0]
        }
        addProductTocart(cartProduct)
        setPosted(false)
        setSize(undefined)
        setQuantity(1)
    }


    return (
        <>
            {/**Selector de tallas */}

            {
                posted && !size && (
                    <span className='text-red-500 mt-2 fade-in'>
                        Debes seleccionar una talla
                    </span>
                )
            }

            <SizeSelector
                onSizeChanged={setSize}
                selectedSize={size}
                availableSizes={product.sizes}
            />
            {/**Selector de cantidad */}
            <QuantitySelector
                quantity={quantity}
                onQuantityChanged={setQuantity}
            />
            {/**button */}
            <button
                onClick={addToCart}
                className="btn-primary my-5">
                Agregar al carrito
            </button>
        </>
    )
}
