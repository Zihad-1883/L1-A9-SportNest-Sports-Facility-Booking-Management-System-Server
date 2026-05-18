const dns = require("node:dns");
dns.setServers(['8.8.8.8' , '8.8.4.4']);

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.MONGODB_URI;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    const db = client.db('SportNestDB');
    const facilitiesCollection = db.collection('AllFacilitiesCollection');
    const bookingCollection = db.collection('BookingCollection');

    app.get('/all-facilities', async (req, res) => {
        const result = await facilitiesCollection.find().toArray();
        res.send(result);
    });

    app.get('/features' , async (req , res) => {
        const result = await facilitiesCollection.find().limit(6).toArray();
        res.send(result);
    });

    app.get('/all-facilities/:facilityId' , async (req , res) => {
      const {facilityId} = req.params;
      const query = {_id : new ObjectId(facilityId)};
      const result = await facilitiesCollection.findOne(query);
      res.send(result);
    })

    app.get('/my-bookings/:userID' , async (req , res) => {
      const {userID} = req.params;
      const result = await bookingCollection.find({userID : userID}).toArray();
      res.json(result);
    })

    app.post('/my-bookings' , async (req , res) => {
      const bookingData = req.body;
      const result = await bookingCollection.insertOne(bookingData);
      res.json(result);
    })

    console.log("Successfully connected to MongoDB!");
  } catch (err) {
    console.error("Connection failed:", err.message); 
  }
}
run();



app.get('/' , async (req , res) => {
    res.send('server is running fine');
})

app.listen(port , () => {
    console.log(`Server is running on port ${port}`)
})