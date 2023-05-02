import React from 'react'

import "./Table.css"
/*
    ===================================================================
    assets: 
    - crear dos const del tipo array que contengan attrib:
     - Thead User y  Tbody User. ej: ["name","email","usertype"]
     - Thead Products y  Tbody Products. ej: ["name","amount","price"]
    ===================================================================

*/


const PRODUCTS = [
    {
        id:1,
        name:"HONDA CBR 1000.",  
        amount:10,          
        price:55000,  
        dateEntry:"10-04-2023",  
        dateExp:""
    },{
        id:2,
        name:"YAMAHA R1",  
        amount:10,          
        price:6000,  
        dateEntry:"10-04-2023",  
        dateExp:""

    },{
        id:1,
        name:"HONDA CBR 100.",  
        amount:10,          
        price:55000,  
        dateEntry:"10-04-2023",  
        dateExp:""

    },{
        id:1,
        name:"HONDA CBR 100.",  
        amount:10,          
        price:55000,  
        dateEntry:"10-04-2023",  
        dateExp:""

    }
];


const Table = () => {


  return (

    //si el UserType isEqual(ADMIN) 
    <>
        <table>
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

export default Table;