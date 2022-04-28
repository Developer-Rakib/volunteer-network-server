const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// middleware 
app.use(express.json())
app.use(cors())


const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://<username>:<password>@cluster0.nbflg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});



app.get("/", (req, res) => res.send("Welcome to Volunteer Network"))

app.listen(port, () => console.log("Port is", port))
