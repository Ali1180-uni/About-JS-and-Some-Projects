const Express = require("express");
const app = Express();

const port = 8080;

app.listen(port, ()=>{
    console.log(`The Activated Port is ${port}`);
});

app.get("/Search", (req,res)=>{ // Acsess by /Search?q=Ali ---> or anything 
    let {Name} = req.query; // ok the Naame is same as in /Search?Name=Something ---> This Code is used to send any Query
    let htmCode = `<h1>Your Requested Query is ${Name}<h1>`;
    res.send(htmCode);
});
