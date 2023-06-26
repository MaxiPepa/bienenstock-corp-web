export const useTopSales = () => {

    const mostSelledProducts = (sales) => {

        return sales.filter(p => p.dispatched === true)
        .map((x) => 
            x.products.map(i => (
                {    
                    name: i.name,
                    quantity: i.quantity
                }
            ))
        )
        .flat()
        .sort((a, b) => b.quantity - a.quantity)
            
    }

    return{ mostSelledProducts } 
}
