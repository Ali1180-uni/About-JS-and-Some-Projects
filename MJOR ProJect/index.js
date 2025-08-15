const list = require('./model/list.js');
const Review = require('./model/Review.js');
const Express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const MethodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const wrapAsync = require('./utils/WrapAsync.js');
const CusErrHandle = require('./utils/CustomErrorHandler.js');
const {listingSchema, ReviewSchema} = require('./joiSchema.js');

const ListingCRUD = require('./Routes/ListingCRUD.js');
const ReviewCRUD = require("./Routes/ReviewCRUD.js");


let app = Express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

app.use(Express.static(path.join(__dirname, "public")));
app.use(Express.urlencoded({ extended: true }));
app.use(MethodOverride("_method"));
app.engine('ejs', ejsMate);


main().then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Connection error:', err);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/Hotels");
}


app.use("/listing", ListingCRUD); // Jese Isme /listing sabme use ho raha tha
app.use("/listing/:id/Review", ReviewCRUD); // Jo Path Common Hoga isko Yaha likhna hn


app.all("/:any",(req,res,next)=>{  // This is the Route which Access if All other were deny and also be written at the end of the Code.
    next(new CusErrHandle(404,"Not Found !"));
});

app.use((err,req,res,next)=>{
    let {statusCode = 500, message = "Somthing went Wrong"} = err;
    res.status(statusCode).render("./Lists/error.ejs",{statusCode,message});
});

app.listen(3000, () => {
    console.log("You are Connected to Port 3000");
});