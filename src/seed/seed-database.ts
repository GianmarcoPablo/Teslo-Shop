import { countries, initialData } from "./seed"
import prisma from "../lib/prisma"

async function main() {

    const { categories, products, users } = initialData

    await prisma.orderAdress.deleteMany()
    await prisma.ordenItem.deleteMany()
    await prisma.order.deleteMany()
    await prisma.user.deleteMany()
    await prisma.country.deleteMany()
    await prisma.productImage.deleteMany()
    await prisma.product.deleteMany()
    await prisma.category.deleteMany()


    await prisma.user.createMany({
        data: users,
    })

    await prisma.country.createMany({
        data: countries,
    })

    // Categorias

    const categoriesData = categories.map(category => ({
        name: category,
    }))


    await prisma.category.createMany({
        data: categoriesData,
    })

    const categoriesDB = await prisma.category.findMany()

    const categoriesMap = categoriesDB.reduce((acc, category) => {
        acc[category.name.toLocaleLowerCase()] = category.id
        return acc
    }, {} as Record<string, string>)

    products.forEach(async (product) => {
        const { type, images, ...rest } = product
        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type],
            }
        })


        const imagesData = images.map(image => ({
            url: image,
            productId: dbProduct.id,
        }))

        await prisma.productImage.createMany({
            data: imagesData,
        })
    })
}

(() => {
    main()
})()