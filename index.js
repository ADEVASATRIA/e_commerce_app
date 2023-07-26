const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');

// mongoose.set("strictQuery",false);
// mongoose
//     .connect("mongodb+srv://admin:adeva10MEI2002@testingapiv1.ojgr6ub.mongodb.net/shop?retryWrites=true&w=majority"
//     )
//     .then(() => console.log("Db Connected"))
//     .catch((err) =>{
//         console.log(err.message);
//     });

const uri = "mongodb+srv://admin:adeva10MEI2002@testingapiv1.ojgr6ub.mongodb.net/shop?retryWrites=true&w=majority";
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
    });
    async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
      // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
        await client.close();
        }
    }
    run().catch(console.dir);


app.listen(3000, () => {
    console.log('Backend is Running...');
});