const express = require('express');
const  cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5001
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// brand-store
// w5ISpqFH4ZL99Vop



const uri = "mongodb+srv://brand-store:w5ISpqFH4ZL99Vop@cluster0.idkvt6k.mongodb.net/?retryWrites=true&w=majority";

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
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) =>{
    res.send(' crud is running...!');
})

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
})