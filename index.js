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
const { error } = require("node:console");
const { createRemoteJWKSet, jwtVerify } = require("jose-cjs");
const uri = process.env.MONGODB_URI;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const JWKS = createRemoteJWKSet(
  new URL(`${process.env.CLIENT_URL}/api/auth/jwks`)
)

const handleTokenVerify =  async (req , res , next) => {
  const header = req?.headers.authorization
  // console.log(header)
  if(!header){
    return res.status(401).json({message : 'Unauthorized'})
  }
  const token = header?.split(' ')[1]
  if(!token){
    return res.status(401).json({message : 'Unauthorized'})
  }
  // console.log(token)
  try{
    const {payload} = await jwtVerify(token , JWKS)
    console.log(payload)
    next()
  }catch(error){
    return res.status(403).json({message : 'Forbidden'})
  }
  
}

async function run() {
  try {
    // await client.connect();

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

    app.get('/all-facilities/:facilityId' , handleTokenVerify , async (req , res) => {
      const {facilityId} = req.params;
      const query = {_id : new ObjectId(facilityId)};
      const result = await facilitiesCollection.findOne(query);
      res.send(result);
    })

    app.get('/my-bookings/:userID' , handleTokenVerify ,  async (req , res) => {
      const {userID} = req.params;
      const result = await bookingCollection.find({userID : userID}).toArray();
      res.json(result);
    })

    app.post('/my-bookings' , handleTokenVerify , async (req , res) => {
      const bookingData = req.body;
      const similarBooking = await bookingCollection.findOne({
          bookedFacilityID: bookingData.bookedFacilityID,
          bookedTimeSlot: bookingData.bookedTimeSlot,
          bookedDate: bookingData.bookedDate,
          bookedFacilityName : bookingData.bookedFacilityName,
        });
        if (similarBooking) {
          return res.status(409).json({ 
            success: false, 
            error: "This time slot is already booked for this facility. Please choose another time slot or choose another facility." 
          });
        }
      const result = await bookingCollection.insertOne(bookingData);
      res.json(result);
    })

    app.delete('/my-bookings/:bookingID' , handleTokenVerify , async (req , res) => {
      const {bookingID} = req.params;
      const result = await bookingCollection.deleteOne({_id : new ObjectId(bookingID)});
      res.json(result);
    })

    app.post('/all-facilities' , handleTokenVerify , async (req , res) => {
      const addedFacilityData = req.body;
      const result = await facilitiesCollection.insertOne(addedFacilityData);
      res.json(result);
    })

    app.get('/added-facilities' , handleTokenVerify , async (req , res) => {
       const result = await facilitiesCollection.find({ owner_email: { $ne: "owner@sportnest.com" }}).toArray();
      res.send(result);
    })

    app.get('/added-facilities/:userID' , handleTokenVerify , async (req , res) => {
      const {userID} = req.params;
      const result = await facilitiesCollection.find({userID : userID}).toArray();
      res.json(result);
    })

    app.delete('/added-facilities/:bookingID' , handleTokenVerify , async (req , res) => {
      const {bookingID} = req.params;
      const facilityResult = await facilitiesCollection.deleteOne({_id : new ObjectId(bookingID)});
      const bookingResult = await bookingCollection.deleteOne({bookedFacilityID : bookingID});
      res.json(facilityResult , bookingResult);
    })

    app.patch('/all-facilities/:facilityId' , handleTokenVerify , async (req , res) => {
      const {facilityId} = req.params;
      const editedData = req.body;
      const result = await facilitiesCollection.updateOne(
        {_id : new ObjectId(facilityId)},
        {$set : editedData}
      )
      res.json(result)
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