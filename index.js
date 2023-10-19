const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5001;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Define the database name
const phoneDB = "your_database_name"; // Replace with your actual database name

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
    await client.connect();

    const phoneCollection = client.db(phoneDB).collection("Phones"); // Assuming "Phones" is the name of the collection
    const brandCollection = client.db(phoneDB).collection("Brand"); // Assuming "Phones" is the name of the collection


// brand name 
app.post('/brand', async (req, res) => {
      const brand = [{brand: "Apple"}, {brand: "Samsung"}, {brand: "Oppo"}, {brand: "Realme"},{brand: "Intel"}, {brand: "Xiaomi"}];
      const result = await brandCollection.insertMany(brand);
      console.log(result);
      res.send(result);
    });

    app.get('/brand', async (req, res) => {
      const result = await brandCollection.find().toArray();
      res.send(result);
    });


    // phones single data
    app.post('/phones', async (req, res) => {
      const phone = req.body;
      const result = await phoneCollection.insertOne(phone);
      console.log(result);
      res.send(result);
    });

    app.get('/phones', async (req, res) => {
      const result = await phoneCollection.find().toArray();
      res.send(result);
    });
    






    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('CRUD is running...!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
