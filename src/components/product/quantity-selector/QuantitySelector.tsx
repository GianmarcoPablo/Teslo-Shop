"use client"
import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
    quantity: number;

}

export default function QuantitySelector({ quantity }: Props) {

    const [selectedQuantity, setSelectedQuantity] = useState(quantity)


    const onQuantityChange = (quantity: number) => {
        if (selectedQuantity + quantity < 1) return

        setSelectedQuantity(selectedQuantity + quantity)
    }

    return (
        <div className="flex">
            <button
                onClick={() => onQuantityChange(- 1)}
            >
                <IoRemoveCircleOutline size={30} />
            </button>

            <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded">
                {selectedQuantity}
            </span>

            <button
                onClick={() => onQuantityChange(+ 1)}
            >
                <IoAddCircleOutline size={30} />
            </button>
        </div>
    )
}
