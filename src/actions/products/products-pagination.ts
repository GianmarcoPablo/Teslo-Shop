"use server"
import prisma from "@/lib/prisma";

interface PaginationOptions {
    page?: number;
    take?: number;
}


export const getPaginatedProductsWithImages = async ({
    page = 1,
    take = 12
}: PaginationOptions) => {

    if (isNaN(Number(page))) page = 1
    if (page < 1) page = 1

    try {

        //1 obtneer los productos
        // const products = await prisma.product.findMany({
        //     take,
        //     skip: (page - 1) * take,
        //     include: {
        //         ProductImage: {
        //             take: 2,
        //             select: {
        //                 url: true
        //             }
        //         }
        //     }
        // })

        // const totalCount = await prisma.product.count({})
        // const totalPages = Math.ceil(totalCount / take)


        const [products, totalCount] = await Promise.all([
            prisma.product.findMany({
                take,
                skip: (page - 1) * take,
                include: {
                    ProductImage: {
                        take: 2,
                        select: {
                            url: true
                        }
                    }
                }
            }),
            prisma.product.count({})
        ])

        const totalPages = Math.ceil(totalCount / take)

        return {
            currentPage: page,
            totalPage: totalPages,
            products: products.map(product => ({
                ...product,
                images: product.ProductImage.map(image => image.url)
            }))
        }

    } catch (error) {
        throw new Error("No se pudieron obtener los productos.")
    }
}