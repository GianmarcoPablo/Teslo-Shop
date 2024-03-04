import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    cart: CartProduct[]

    getTotalItesm: () => number
    getSumaryInformation: () => { subTotal: number, igv: number, total: number, itemsInCart: number }
    addProducToCart: (product: CartProduct) => void
    updateProductQuantity: (product: CartProduct, quantity: number) => void
    removeProductFromCart: (product: CartProduct) => void
}

export const useCartStore = create<State>()(



    persist(
        (set, get) => ({
            cart: [],

            getSumaryInformation: () => {
                const { cart } = get()

                const subTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
                const igv = subTotal * 0.18
                const total = subTotal + igv
                const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0)
                return {
                    subTotal,
                    igv,
                    total,
                    itemsInCart
                }
            },

            removeProductFromCart: (product) => {
                const { cart } = get()
                const updateCart = cart.filter(item => item.id !== product.id || item.size !== product.size)
                set({ cart: updateCart })
            },

            updateProductQuantity: (product, quantity) => {
                const { cart } = get()

                const updateCartProducts = cart.map(item => {
                    if (item.id === product.id && item.size === product.size) {
                        return {
                            ...item,
                            quantity
                        }
                    }
                    return item
                })
                set({ cart: updateCartProducts })
            },

            getTotalItesm: () => {
                const { cart } = get()
                return cart.reduce((total, item) => total + item.quantity, 0)
            },

            addProducToCart: (product) => {
                const { cart } = get()

                //1. revisar si el producto ya existe en el carrito con la talla seleccionada
                const productInCart = cart.some(
                    item => item.id === product.id && item.size === product.size
                )

                //2. si no existe, agregarlo al carrito
                if (!productInCart) {
                    set({ cart: [...cart, product] })
                    return
                }

                //3. si existe, actualizar la cantidad
                const updateCart = cart.map(item => {
                    if (item.id === product.id && item.size === product.size) {
                        return {
                            ...item,
                            quantity: item.quantity + product.quantity
                        }
                    }
                    return item
                })
                set({ cart: updateCart })
            }
        })
        , {
            name: "shopping-cart",
        }
    )
)