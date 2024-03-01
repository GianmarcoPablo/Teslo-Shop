import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const productsInCart = [
    initialData.products[0],
]

export default function () {
    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-[1000px]">
                <Title
                    title="Verificar orden"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {/* Carrito */}

                    <div className="flex flex-col mt-5">
                        <span>Ajustar Elementos</span>
                        <Link
                            href="/cart"
                            className="underline mb-5"
                        >
                            Editar Carrito
                        </Link>
                        {/* Items */}

                        {
                            productsInCart.map(product => (
                                <div
                                    key={product.slug}
                                    className="flex mb-5"
                                >
                                    <Image
                                        src={`/products/${product.images[0]}`}
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
                                        <p>{product.title}</p>
                                        <p>${product.price} x 3</p>
                                        <p className="font-bold">SubTotal: ${product.price * 3} </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    {/* Checkout - Resumen de orden */}

                    <div className="bg-white rounded-xl p-7 ">

                        <h2 className="text-2xl mb-2">Dirección de entrega</h2>
                        <div className="mb-10">
                            <p>Gian Marco</p>
                            <p>Av. Tomas Valle</p>
                            <p>Comas</p>
                            <p>San Juan de lurigancho</p>
                            <p>Callao</p>
                            <p>CP 123456</p>
                            <p>123.123.123</p>
                        </div>

                        <div
                            className="w-full h-0.5 rounded bg-gray-200 mb-10"
                        />

                        <h2 className="text-2xl mb-2"> Resumen de orden</h2>
                        <div className="grid grid-cols-2">
                            <span>N# Prducts</span>
                            <span className="text-rigth">3 Articulos</span>
                            <span>Subtotal</span>
                            <span className="text-rigth">$ 100</span>
                            <span>Inpuestos (15%)</span>
                            <span className="text-rigth">$ 100</span>
                            <span className="text-2xl mt-5">Total: </span>
                            <span className="text-2xl mt-5">$ 100</span>
                        </div>

                        <div className="mt-5 mb-2 w-full">

                            <p className="mb-5">
                                <span className="text-xs">
                                    Al hacer click en "Colocar orden" aceptas nuestros <a href="#" className="underline">Términos y condiciones</a> y <a href="#" className="underline">Política de privacidad</a>
                                </span>
                            </p>

                            <Link
                                href="/orders/123"
                                className="flex btn-primary justify-center"
                            >
                                Colocar Orden
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
