import React from "react";

export default function TurnoBos({count, nombre}) {
    return (
        <div className="text-center pt-3 border border-gray shadow-custom" style={{ width: '150px', height: '150px'}}>
            <div className="col-sm-12" style={{fontSize: '55px'}}>{count}</div>
            <div className="col-sm-12">{nombre}</div>
        </div>
    )
}