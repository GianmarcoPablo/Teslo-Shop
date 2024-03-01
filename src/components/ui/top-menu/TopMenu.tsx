"use client"
import { titleFont } from "@/config/fonts"
import { useUiStore } from "@/store"
import Link from "next/link"
import { IoSearchOutline, IoCartOutline } from "react-icons/io5"

export default function TopMenu() {

    const openMenu = useUiStore(state => state.openSideMenu)

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
                    href="/category/men"
                    className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
                >
                    Hombres
                </Link>
                <Link
                    href="/category/women"
                    className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
                >
                    Mujeres
                </Link>
                <Link
                    href="/category/kid"
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
                    href="/cart"
                    className="mx-2"
                >
                    <div className="relative">
                        <span className="absolute text-xs px-1 rounded-full font-bold -top-2 bg-blue-700 text-white -right-2">3</span>
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
