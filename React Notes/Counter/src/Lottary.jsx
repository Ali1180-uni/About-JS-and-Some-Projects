import { useState } from "react";
import './Lottary.css'

function Lottary() {
    let [Num, setNum] = useState([{a: 0, b: 0, c: 0}]);
    function Spin(){
        let newLuck1 = Math.floor(Math.random() * 8) + 1;
        let newLuck2 = Math.floor(Math.random() * 9) + 1;
        let newLuck3 = Math.floor(Math.random() * 7) + 1;
        
        setNum([{
            a: newLuck1,
            b: newLuck2,
            c: newLuck3
        }]);
    }

    return (
        <div className="cover">
            {(Num[0].a + Num[0].b + Num[0].c !== 15) ? (
                <>
                    <div className="con">
                        <span>{Num[0].a}</span>&nbsp;&nbsp;&nbsp;
                        <span>{Num[0].b}</span>&nbsp;&nbsp;&nbsp;
                        <span>{Num[0].c}</span>
                    </div>
                    <br /><br />
                    <div className="Button">
                        <button onClick={Spin}>Spin & Win</button>
                    </div>
                </>
            ) : (
                <p style={{color: "black", fontSize: "30px"}}>Congrats You Win ! Winner is: {Num[0].a}{Num[0].b}{Num[0].c} </p>
            )}
        </div>
    );
}

export default Lottary