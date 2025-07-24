let Express = require('express');
let app = Express();

// Middlewares Which are Used to Parse Data From URL to Data.
app.use(Express.urlencoded({ extended: true }));
// Middlewares Which are Used to Parse Data From JSON to Data.
app.use(Express.json());

let port = 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('/register', (req, res) => {
    let {user , pass} = req.query;
    console.log(`Received registration request for: ${user}`);
    res.send(`GET Request Recieved: Register ${user} with password ${pass}`);
});

app.post('/register', (req, res) => {
    let {user , pass} = req.body;
    console.log(`Received registration request for: ${user}`);
    res.send(`POST Request Recieved: Register ${user} with password ${pass}`);
});