import React from 'react'

import "./BoxParameters.css";

const BoxParameters = ({ quantity, title, color, icon}) => {
    const boxStyle = {
        backgroundColor: `rgba(${color}, 0.7)`,
        border: `rgba(${color}) 1px solid`
    };

    return (
        <div className="box" style={boxStyle}>  
            <div className="box-main-content">
            <div className="box-content-info">
                <p className="box-quantity">{quantity}</p>
                <p className="box-title">{title}</p>
            </div>
            {icon}
            </div>
        </div>
    )
}  

export default BoxParameters