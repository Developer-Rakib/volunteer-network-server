const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient } = require('mongodb');
require('dotenv').config();

// middleware 
app.use(express.json())
app.use(cors())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nbflg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const run = async () => {
    try {
        await client.connect();
        const VolunteerEventsCollection = client.db("volunteer").collection("events");
        app.get("/events", async (req, res) => {
            const query = {};
            const cursor = VolunteerEventsCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })

    } finally {

    }
}
run().catch(console.dir)




app.get("/", (req, res) => res.send("Welcome to Volunteer Network"))

app.listen(port, () => console.log("Port is", port))
