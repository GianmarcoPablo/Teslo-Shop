export const revalidate = 60

import { notFound, redirect } from "next/navigation";
import { initialData } from "@/seed/seed";
import { Pagination, ProductGrid, Title } from "@/components";
import { getPaginatedProductsWithImages } from "@/actions";
import { Gender } from "@prisma/client";

const seedProducts = initialData.products;

interface Props {
    params: {
        gender: string;
    },
    searchParams: {
        page?: string;
    }
}

export default async function GenderByPage({ params, searchParams }: Props) {
    const { gender } = params;

    const page = searchParams.page ? Number(searchParams.page) : 1;

    const { products, currentPage, totalPage } = await getPaginatedProductsWithImages({ page, gender: gender as Gender });


    if (products.length === 0) {
        redirect(`/gender/${gender}`)
    }


    const labels: Record<string, string> = {
        "men": "Hombres",
        "women": "Mujeres",
        "kid": "Niños",
        "unisex": "para todos"
    }

    return (
        <div>

            <Title
                title={`Artículos para ${(labels)[gender]}`}
                subtitle="Nuevos productos"
            />

            <ProductGrid
                products={products}
            />

            <Pagination
                totalPage={totalPage}
            />

        </div>
    )
}
