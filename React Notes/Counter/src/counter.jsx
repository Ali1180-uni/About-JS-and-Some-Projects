import { useState } from "react";

function Count(){
    let [count, setCount] = useState({blue: 0,red: 0,green: 0,yellow: 0});
    let [arr, setArr] = useState(["No Move"]);
    function blueChnage() {
        // setCount((nextState)=>{
        //     console.log("Blue" + nextState.blue); 
        //     return {...nextState, blue: nextState.blue + 1};
        // });
        setArr((next)=>{
            return [...next, "Blue move"];
        });
    }
    function redChnage() {
        setCount((nextState)=>{
            console.log("Red" + nextState.red);
            return {...nextState, red: nextState.red + 1}; 
        });
    }
    function yellowChnage() {
        setCount((nextState)=>{
            console.log("Yellow" + nextState.yellow);
            return {...nextState, yellow: nextState.yellow + 1}; 
        });
    }
    function greenChnage() {
        setCount((nextState)=>{
            console.log("Green " + nextState.green);
            return {...nextState, green: nextState.green + 1}; 
        });
    }
    return (
        <div>
            <h1>Ludo Game !</h1>
            <div>
                <p>Blue Count: {count.blue}x</p>
                <p>{arr[1]}</p>
                <button style={{backgroundColor: "blue"}} onClick={blueChnage}>1x</button>
            </div>
            <div>
                <p>Red Count: {count.red}x</p>
                <button style={{backgroundColor: "red"}} onClick={redChnage}>1x</button>
            </div>
            <div>
                <p>Yellow Count: {count.yellow}x</p>
                <button style={{backgroundColor: "yellow", color: "black"}} onClick={yellowChnage}>1x</button>
            </div>
            <div>
                <p>Green Count: {count.green}x</p>
                <button style={{backgroundColor: "green"}} onClick={greenChnage}>1x</button>
            </div>
        </div>
    );
}

export default Count