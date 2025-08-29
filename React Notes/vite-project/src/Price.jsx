function Price ({oldP,newP}){
    return (
        <div style={{backgroundColor: "gold", color: "black"}}>
            <span style={{textDecorationLine: "line-through"}}>{oldP}</span>
            &nbsp;&nbsp;&nbsp; 
            <span style={{fontWeight: "bold"}}>{newP}</span>
        </div>
    );
}

export default Price;