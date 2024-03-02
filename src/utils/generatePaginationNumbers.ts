
/// [!,2,3,4....,7]
export const generatePaginationNumbers = (currentPage: number, totalPage: number) => {
    // Si el numero total de pagina s es 7 o menos vamos a mostrar todas las pagina sin puntos suspensivos

    if (totalPage <= 7) {
        return Array.from({ length: totalPage }, (_, i) => i + 1)
    }

    // Si la pagina actual esta entre las primeras 3 paginas mostrar las primeras 3 , puntos suspensivos y las ultimas 2 paginas

    if (currentPage <= 3) {
        return [1, 2, 3, "...", totalPage - 1, totalPage]
    }

    // Si la pagina actual esta entre las ultimas 3 paginas mostrar las primeras 2 , puntos suspensivos y las ultimas 3 paginas

    if (currentPage >= totalPage - 2) {
        return [1, 2, "...", totalPage - 2, totalPage - 1, totalPage]
    }

    // si la pagina actual esta en otro lugar medio mostrar la priemra pagina, puntos suspensivos, la pagina actual, puntos suspensivos y la ultima pagina

    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPage]
}