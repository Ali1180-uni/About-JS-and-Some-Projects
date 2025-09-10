import { useEffect, useState } from "react";

export default function Counter(){
    let [countx, setCountx] = useState(0);
    let [county, setCounty] = useState(0);
    function incx (){
        setCountx(countx = countx + 1);
    }
    function incy (){
        setCounty(county = county + 1);
    }

    useEffect(function show(){
        console.log("This is Use-Effect");
    },[countx]);

    return(
        <div>
            <h1>Counter X</h1>
            <h4>Countx: {countx}</h4>
            <button onClick={incx}>+1</button>
            <h1>Counter Y</h1>
            <h4>Count: {county}</h4>
            <button onClick={incy}>+1</button>
        </div>
    )
}