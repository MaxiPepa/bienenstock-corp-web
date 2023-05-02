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
const TheadUser = ["ID","NAME","ROLE","EMAIL"]

const PRODUCTS = [
    {
        id:1,
        name:"HONDA CBR 1000.",  
        amount:10,          
        price:55000,  
        dateEntry:"10-04-2023",  
        dateExp:""
    },
    {
        id:2,
        name:"YAMAHA R1",  
        amount:10,          
        price:6000,  
        dateEntry:"10-04-2023",  
        dateExp:""

    },
    {
        id:1,
        name:"HONDA CBR 100.",  
        amount:10,          
        price:55000,  
        dateEntry:"10-04-2023",  
        dateExp:""

    },
    {
        id:1,
        name:"HONDA CBR 100.",  
        amount:10,          
        price:55000,  
        dateEntry:"10-04-2023",  
        dateExp:""

    }
];


const Table = ({content,thead}) => {


  return (
    <>
        <table>
            <thead>
                { thead.map((attr)=>{<th>{attr}</th>}) }
            </thead>    
            <tbody>
                {
                    content.map((item) =>
                    <tr key={item.userId}  >
                        <td>{item.fullName}</td>  
                        <td>{item.userType}</td>  
                        <td>{item.email}</td>
                    </tr>
                    )
                }
            </tbody>
        </table>
    </>

  )



}

export default Table;