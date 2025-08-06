const express = require('express');
const CustomErr = require('./ExpressErrorHandle.js');
const app = express();

app.listen(3000, ()=>{
    console.log("Server Run");
});


let callBack = (req,res,next)=>{
    let {Call} = req.query;  // Check the Query From the URL 
    if(Call === "AliHere"){
        next();
    }else{
        throw new CustomErr(401,"<--- Unautherized Access --->");
    }
}

app.get("/api",callBack,(req,res)=>{
    res.send("Ali Here");
});

app.use((err,req,res,next)=>{
    res.send(err);
})




// app.use((err,req,res,next)=>{
//     console.log("--> Error 1 <--");
//     next(err); // This Next Give the Control From this Middleware to next (--> ERROR Handling Middleware <--)
// });


// app.use((err,req,res,next)=>{  // First Argument err is show that this is an Error Handling Middleware
//     console.log("--> Error 2 <--");
//     next(); // This Next Give the Control From this Middleware to next (--> NON-ERROR Handling Middleware <--)
// });


// app.use("/err",(req,res)=>{
//     console.log("This Error");
// })