"use client"
import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";
import { useEffect, useState } from "react";

interface Props {
    slug: string;
}

export default function StockLabel({ slug }: Props) {

    const [stock, setStock] = useState(0)
    const [isLoadng, setIsLoading] = useState(true)

    useEffect(() => {
        getStock()
    }, [])

    const getStock = async () => {
        //Todo: llamar su server actions
        const inStock = await getStockBySlug(slug)
        setStock(inStock)
        setIsLoading(false)
    }

    return (
        <>
            {
                isLoadng
                    ? <h1 className={`${titleFont.className} antialiased font-bold text-xl bg-gray-200 animate-pulse`}>
                        &nbsp;
                    </h1>

                    : <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
                        Stock: {stock}
                    </h1>
            }
        </>
    )
}
