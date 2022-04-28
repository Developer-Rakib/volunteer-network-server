const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ObjectId } = require('mongodb');
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
        const SavedEventsCollection = client.db("volunteer").collection("SaveEvents");

        // get all 
        app.get("/events", async (req, res) => {
            const query = {};
            const cursor = VolunteerEventsCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })

        // get by id 
        app.get("/events/:id", async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) };
            const result = await VolunteerEventsCollection.findOne(query);
            res.send(result)
        })

        // get all Saved data
        app.get("/SavedEvents", async (req, res) => {
            const query = {};
            const cursor = SavedEventsCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })
        // post Saved data
        app.post("/SavedEvents", async (req, res) => {
            const event = req.body;
            if (!event.title || !event.img) {
                return res.send({ success: false, message: "data not found" })
            }
            const result = await SavedEventsCollection.insertOne(event);
            res.send({ success: true, message: `Successfully Saved ${event.title}`, result })
        })

        // delete seved data
        app.delete("/SavedEvents/:id", async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) };
            const result = await SavedEventsCollection.deleteOne(query);
            res.send({ success: true, message: "Cancel Successfull", result })
        })

    } finally {

    }
}
run().catch(console.dir)




app.get("/", (req, res) => res.send("Welcome to Volunteer Network"))

app.listen(port, () => console.log("Port is", port))
