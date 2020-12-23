const express = require('express');
const app = express();
const bodyParser=require('body-parser');
// const MongoClient = require('mongodb');
const mongoose = require('mongoose');
// database schema for mongodb
const routes=require('./api/model/router')
// const students=require("./api/model/students")

mongoose.connect('mongodb+srv://aliraza:aliraza@cluster0.mvd3i.mongodb.net/test?retryWrites=true&w=majority')
const connection = mongoose.connection;
connection.on("open", function() {
    console.log("MongoDB database connection established successfully");
  });
  //for getting data from api from frontend
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
//url's
app.use('/students',routes)

app.post("/faculty", (req, res, next) => {
    res.status(200).json(["faculty-post", "Tony", "Lisa", "Michael", "Ginger", "Food"]);
});
app.get("/faculty", (req, res, next) => {
    res.status(200).json(["faculty-get", "Tony", "Lisa", "Michael", "Ginger", "Food"]);
});
app.use((req, res, next) => { res.status(404).json({ error: "Bad request" }) })
app.listen(3000, () => { console.log("its runnning 2...") })

