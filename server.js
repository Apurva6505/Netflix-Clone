const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')

let initial_path = path.join(__dirname, "public")

let app = express()

app.use(express.static(initial_path))

app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, "index.html"));
})

let isAuth = false;

app.get('/home', (req, res) => {
    res.sendFile(path.join(initial_path, "home.html"));
})

app.get('/signup', (req, res) => {
    res.sendFile(path.join(initial_path, "signup.html"));
})

app.get('/login', (req, res) => {

    res.sendFile(path.join(initial_path, "login.html"));
})

app.get('/:id', (req, res) => {
    res.sendFile(path.join(initial_path, "about.html"));
})

app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect("mongodb://127.0.0.1:27017/netflixDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;


app.post("/signup", (req, res) => {
    const user = {
        name: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    var data = {
        "name" : user.name ,
        "email" : user.email,
        "password" : user.password
    }


    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;

        } else {
            console.log("Record Inserted Successfully!!");
            res.sendFile(path.join(initial_path, "login.html"));
        }

    });



});

app.post("/login", (req, res) => {
    var name = req.body.name;
    var password = req.body.password;


})

app.listen(4131, () => {
    console.log("Server is listening on port http://localhost:4131")
})