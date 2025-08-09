const mongoose = require("mongoose");

main().then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Connection error:', err);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/ReltionPractice");
}

let OrderSchema = new mongoose.Schema({
  item: String,
  price: Number,  
});

let Order = mongoose.model("Order", OrderSchema);

// const addOrders = async () => {
//     let result = await Order.insertMany([
//         {
//             item: "Milk",
//             price: 12,
//         },
//         {
//             item: "Lemon",
//             price: 10,
//         },        
//         {
//             item: "Polish",
//             price: 16,
//         },
//     ]);

//     console.log(result);
// }

// addOrders();

// // First Create the Schema which Reference you want to pass it.
let CustomerSchema = new mongoose.Schema({
    Name:  String,
    Orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",

        }
    ]
});

let Customer = mongoose.model("Customer", CustomerSchema);

// const addCustomer = async () =>{
//     let Cus1 = new Customer({
//         Name: "John Doe",
//     });
//     let order1 = await Order.findOne({item: "Milk"});
//     let order2 = await Order.findOne({item: "Lemon"});

//     Cus1.Orders.push(order1);
//     Cus1.Orders.push(order2);

//     let result = await Cus1.save();

//     console.log(result);
// }

// addCustomer();



const showCustomer = async () =>{
    try{           
     let result = await Customer.find({}).populate("Orders");
    console.log(result[0]);
    }catch(err){
        console.log(err.message);
    }
}

showCustomer();