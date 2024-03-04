"use client"
import { titleFont } from "@/config/fonts"
import { useUiStore } from "@/store"
import { useCartStore } from "@/store/cart/cart-store"
import Link from "next/link"
import { useEffect, useState } from "react"
import { IoSearchOutline, IoCartOutline } from "react-icons/io5"

export default function TopMenu() {

    const openMenu = useUiStore(state => state.openSideMenu)
    const totalItemnsInCart = useCartStore(state => state.getTotalItesm())

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(true)
    }, [])

    return (
        <div className="flex px-5 justify-between items-center w-full">
            <div>
                <Link
                    href="/"
                >
                    <span className={`${titleFont.className} antialiased font-bold`}>Teslo</span>
                    <span>| Shop</span>
                </Link>
            </div>

            <div className="hidden sm:block">
                <Link
                    href="/gender/men"
                    className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
                >
                    Hombres
                </Link>
                <Link
                    href="/gender/women"
                    className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
                >
                    Mujeres
                </Link>
                <Link
                    href="/gender/kid"
                    className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
                >
                    Niños
                </Link>
            </div>

            {/**Search cart Menu */}
            <div className="flex items-center">
                <Link
                    href="/search"
                    className="mx-2"
                >
                    <IoSearchOutline className="w--5 h-5" />
                </Link>
                <Link
                    href={((totalItemnsInCart === 0) && loaded) ? "/empty" : "/cart"}
                    className="mx-2"
                >
                    <div className="relative">
                        {
                            (loaded && totalItemnsInCart > 0) && (
                                <span className="fade-in absolute text-xs px-1 rounded-full font-bold -top-2 bg-blue-700 text-white -right-2">
                                    {totalItemnsInCart}
                                </span>
                            )
                        }
                        <IoCartOutline className="w-5 h-5" />
                    </div>
                </Link>

                <button
                    onClick={openMenu}
                    className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
                >
                    Menú
                </button>
            </div>

        </div>
    )
}
