// --> One to Many Relationship

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

const addOrders = async () => {
    let result = await Order.insertMany([
        {
            item: "Milk",
            price: 12,
        },
        {
            item: "Lemon",
            price: 10,
        },        
        {
            item: "Polish",
            price: 16,
        },
    ]);
    
    console.log(result);
}

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


CustomerSchema.pre("findOneAndDelete", ()=>{
    console.log("Pre Comand to Delete All");
});

CustomerSchema.post("findOneAndDelete", async(Customer)=>{
    if(Customer.Orders.length){
        let res = await Order.deleteMany({_id: {$in: Customer.Orders}});
        console.log(res);
    }
});


let Customer = mongoose.model("Customer", CustomerSchema);

const addCustomer = async () =>{
    let Cus1 = new Customer({
        Name: "John Doe",
    });
    let order1 = await Order.findOne({item: "Milk"});
    let order2 = await Order.findOne({item: "Lemon"});

    Cus1.Orders.push(order1);
    Cus1.Orders.push(order2);

    let result = await Cus1.save();

    console.log(result);
}

// addCustomer();



const DeleteCustomer = async () =>{
    try{           
     let result = await Customer.findByIdAndDelete('689734cd619808e5b14495a6')
    console.log(result);
    }catch(err){
        console.log(err.message);
    }
}

DeleteCustomer();