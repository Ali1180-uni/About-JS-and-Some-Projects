import "./Tab.css"

function Msg ({user, msg, color}){
    // const style = user === "Ali" 
    //     ? {
    //         backgroundColor: "grey",
    //         color: "black"
    //       }
    //     : {
    //         backgroundColor: "red",
    //         color: "yellow"
    //       };
    
    return (
        <div className="Tab">
            <h1 style={{color : color}}>{user}</h1>
            <h3>{msg}</h3>
        </div>
    );
}

export default Msg;