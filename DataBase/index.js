const { faker } = require('@faker-js/faker');
let Express = require('express');
const mysql = require('mysql2');
const path = require('path');
const methodOverride = require('method-override');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "JS_APP",
    password: "Rx321e10",
});

let app = Express();

app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(Express.urlencoded({extended: true}));
app.use(Express.static(path.join(__dirname, "public")));


let port = 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

let Random = () => {
    return [
        faker.string.uuid(),
        faker.internet.username(),
        faker.internet.email(),
        faker.internet.password(),
    ];
}


// try{
//     connection.query(query,[data],(err,result)=>{
//     if(err) throw err;
//     console.log(result);
// });
// } catch(err){
//     console.log(err);
// }

// connection.end();

app.get("/",(req,res)=>{
    let query = "SELECT COUNT(*) AS count FROM user";
    try{
        connection.query(query,(err,result)=>{
            if(err) throw err;
            // console.log(result[0].key); One option to show the Data
            // console.log(result[0]["count"]); Second way to Show Only the data of key value
            let val = result[0]["count"];
            // console.log(result);
            res.render("index.ejs",{val});
        });
    }catch(err){
        console.log(err);
        res.send("Something is Error");
    }
});


app.get("/users",(req,res)=>{
    let query = "SELECT * FROM user";
    try{
        connection.query(query,(err,result)=>{
            if(err) throw err;
            let val = result;
        res.render("user.ejs",{val});
        });
    }catch(err){
        console.log(err);
        res.send("Something is Error");
    }
});

app.get("/users/:id/edit",(req,res)=>{
    let {id} = req.params;
    let query = `SELECT * FROM user WHERE id ='${id}' `;
    try{
        connection.query(query,(err,result)=>{
            if(err) throw err;
            let val = result[0];
        res.render("edit.ejs",{val});
        });
    }catch(err){
        console.log(err);
        res.send("Something is Error");
    }
});

app.get("/users/add",(req,res)=>{
    res.render("add.ejs");
});

app.patch("/user/:id",(req,res)=>{
    let {id} = req.params;
    let {username} = req.body;
    let query = `UPDATE user SET username='${username}' WHERE id='${id}'`;
    try{
        connection.query(query,(err,result)=>{
            if(err) throw err;
            console.log(result);
            res.redirect("/users");
        });
    }catch(err){
        console.log(err);
        res.send("Something is Error");
    }
});

app.delete("/users/:id",(req,res)=>{
    let {id} = req.params;
    let query = `DELETE FROM user WHERE id='${id}'`;
    try{
        connection.query(query,(err,result)=>{
            if(err) throw err;
            console.log(result);
            res.redirect("/users");
        });
    }catch(err){
        console.log(err);
        res.send("Something is Error");
    }

});

app.post("/users",(req,res)=>{
    let {id ,username, email, password} = req.body;
    let query = `INSERT INTO user (id, username, email, password) VALUES ('${id}', '${username}', '${email}', '${password}')`;
    try{
        connection.query(query,(err,result)=>{
            if(err) throw err;
            console.log(result);
            res.redirect("/users");
        });
    }catch(err){
        console.log(err);
        res.send("Something is Error");
    }
});