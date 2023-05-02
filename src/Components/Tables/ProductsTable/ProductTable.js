import React from 'react'

import "./ProductTable.css"; 


const PRODUCTS = [
    { 
        id:1,
        name:"PS5",
        amount:10,
        price:1500,
        dateEntry: "10/04/2023",
        dateExp: 0 
    },
    {
        id:2,
        name:"Honda Cbr 1000",
        amount:10,
        price:50000,
        dateEntry: "10/04/2023",
        dateExp: 0 

    },
    {
        id:3,
        name:"Audi A3",
        amount:18,
        price:35500,
        dateEntry: "10/01/2022",
        dateExp: 0 

    }
]

const ProductTable = () => {

  return (
    <>
        <table className='ProductTable'>
            <thead >
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Fecha de ingreso</th>
                <th>Fecha de vencimiento</th>
            </thead>    
            <tbody>
                {PRODUCTS.map((item) =>
                    <tr key={item.id}  >
                        <td>{item.name}</td>  
                        <td>{item.amount}</td>          
                        <td>usd {item.price}</td>  
                        <td>{item.dateEntry}</td>  
                        <td>{item.dateExp}</td>
                    </tr>
                )}
            </tbody>
        </table>

    </>
  )
}

export default ProductTable;