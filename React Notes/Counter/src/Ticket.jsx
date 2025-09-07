import { TicketNum } from "./TicketNum";
import './Component.css'

export function Ticket({Ticket}){
    return (
        <div className="Ticket">
            <h1>Lottary Game</h1>
            <br />
            {Ticket.map((num,idx)=> (
                <TicketNum key={idx} Num={num}/>
            ))}
        </div>       
    )
}