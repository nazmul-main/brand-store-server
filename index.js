const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5001;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Define the database name
const phoneDB = "your_database_name"; // Replace with your actual database name



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.idkvt6k.mongodb.net/?retryWrites=true&w=majority`;

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
    // await client.connect();

    const phoneCollection = client.db(phoneDB).collection("Phones"); 
    const brandCollection = client.db(phoneDB).collection("Brand"); 
    const cartCollection = client.db(phoneDB).collection("Cart"); 


// brand name 
app.post('/brand', async (req, res) => {
      const brand =[
        {
          "photo": "https://i.ibb.co/Bg2Z4gj/Apple-Logo.png",
          "brand": "Apple"
        },
        {
          "photo": "https://i.ibb.co/56B3Z7d/png-transparent-samsung-logo-samsung-galaxy-a8-2018-logo-samsung-electronics-arrow-sketch-company-te.png",
          "brand": "Samsung"
        },
        {
          "photo": "https://i.ibb.co/YDD5P8g/png-clipart-oppo-logo-phone-identity-removebg-preview.png",
          "brand": "Oppo"
        },
        {
          "photo": "https://i.ibb.co/6D7Wvjy/Realme-logo.png",
          "brand": "Realme"
        },
        {
          "photo": "https://i.ibb.co/CsgQXMc/png-transparent-intel-logo-fujitsu-business-technology-intel-blue-text-trademark-thumbnail-removebg.png",
          "brand": "Intel"
        },
        {
          "photo": "https://i.ibb.co/Y29C8BZ/60410c7b26ef2b00045692f8.png",
          "brand": "Xiaomi"
        }
      ]
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


    // post mycard data------------------------
    app.post('/mycart', async (req, res) => {
      const cart = req.body;
      const result = await cartCollection.insertOne(cart);
      console.log(result);
      res.send(result);
    });

    app.get('/mycart', async (req, res) => {
      const result = await cartCollection.find().toArray();
      res.send(result);
    });

    

    app.get('/phones/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await phoneCollection.findOne(query);
      res.send(result);
    })

   

    app.put('/phones/:id', async (req, res) => {
      const id = req.params.id;
      const phone = req.body
      console.log(id, phone);
      const filter = {_id: new ObjectId(id)}
      const option = {upsert: true}
      const updatedPhone = {
        $set: {
          name: phone.name,
          type: phone.type,
          price: phone.price,
          photo: phone.photo,
          brand: phone.brand,
          rating: phone.rating
        }
      }

      const result = await phoneCollection.updateOne(filter, updatedPhone, option);
      res.send(result);
      console.log(result);

    })


    app.get('/phon/:brand', async (req, res) => {
      const brand = req.params.brand;
      const query = { brand: brand };
      const result = await phoneCollection.find(query).toArray();
      res.send(result);
    });

    // Delete Cart --------------------------------
    app.delete('/mycart/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await cartCollection.deleteOne(query);
      res.send(result);

    })




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
