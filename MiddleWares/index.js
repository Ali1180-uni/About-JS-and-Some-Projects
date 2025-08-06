const express = require('express');
const app = express();

app.listen(3000, ()=>{
    console.log("Server Run");
});

// app.use((req,res,next)=>{
//     console.log("1st Middleware is Working");
//     next();
// });

// app.use((req,res,next)=>{
//     req.CurTime = new Date(Date.now()).toString();
//     console.log(req.method,req.hostname,req.CurTime);
//     next();
// });

// app.get("/",(req,res)=>{ // When Every time Request is send the Middlewares are run & these Responses are not send
//     res.send("The Root Route is Running");
// });

// app.get("/random",(req,res)=>{
//     res.send("Random Page");
// });

// let callBack = (req,res,next)=>{
//     let {Call} = req.query;  // Check the Query From the URL 
//     if(Call === "AliHere"){
//         next();
//     }else{
//         res.send("Request Denied Wrong Call");
//     }
// }

// app.get("/api",callBack,(req,res)=>{
//     res.send("SucessFully Autherized");
// });

app.use((req,res)=>{  // Error Handling Middleware Which works when there is no Route is Matched
    res.send("Page not Found");
});