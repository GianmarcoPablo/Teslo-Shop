import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";


interface Props {
    searchParams: {
        page?: string;
    }
}

export default async function Home({ searchParams }: Props) {

    const page = searchParams.page ? Number(searchParams.page) : 1;

    const { products, currentPage, totalPage } = await getPaginatedProductsWithImages({ page });


    if (products.length === 0) {
        redirect("/")
    }

    return (
        <>
            <Title
                title="Tienda"
                subtitle="Todos los productos disponibles en nuestra tienda."
                className="mb-2"
            />

            <ProductGrid
                products={products}
            />

            <Pagination
                totalPage={totalPage}
            />
        </>
    );
}
