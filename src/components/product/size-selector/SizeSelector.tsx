import type { Sizes } from "@/interfaces";
import clsx from "clsx";

interface Props {
    selectedSize: Sizes;
    availableSizes: Sizes[];
}

export default function SizeSelector({ selectedSize, availableSizes }: Props) {
    return (
        <div className="my-5">
            <h3 className="font-bold mb-4">Tallas Disponibles</h3>

            <div className="flex">
                {
                    availableSizes.map(size => (
                        <button
                            className={clsx(
                                "mx-2 hover:underline text-lg",
                                {"underline": size === selectedSize}
                            )}
                            key={size}
                        >
                            {size}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}
