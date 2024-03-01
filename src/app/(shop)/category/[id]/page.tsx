import { notFound } from "next/navigation";
import { initialData } from "@/seed/seed";
import { ProductGrid, ProductGridItem, Title } from "@/components";
import { Category } from "@/interfaces";

const seedProducts = initialData.products;

interface Props {
    params: {
        id: Category;
    }
}

export default function ({ params }: Props) {
    const { id } = params;

    const validCategories = ["men", "women", "kid", "unisex"];

    if (!validCategories.includes(id)) {
        return notFound();
    }

    const products = seedProducts.filter(product => product.gender === id);

    const labels: Record<Category, string> = {
        "men": "Hombres",
        "women": "Mujeres",
        "kid": "Niños",
        "unisex": "para todos"
    }

    return (
        <div>

            <Title
                title={`Artículos para ${(labels)[id]}`}
                subtitle="Nuevos productos"
            />

            <ProductGrid
                products={products}
            />
        </div>
    )
}
