import { useState } from "react";
import { generateRandom} from "./helper";
import { Ticket } from "./Ticket";
import './Component.css'

function Lottary({n = 3, winFunc}) {
  let [Num, setNum] = useState(generateRandom(n));
  let winner = winFunc(Num);
  function Spin() {
    setNum(generateRandom(n));
  }

  return (
    <div>
      <div className="cover">
        <Ticket Ticket={Num} />
      </div>
      <br />
      <div>
        {winner ? (<h1>You are Winner</h1>) : <button className="button" onClick = {Spin}>Spin & Win</button> }        
      </div>
    </div>
  );
}

export default Lottary;
