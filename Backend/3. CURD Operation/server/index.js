const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const port = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// User: simpleDBUser
// Password: Your_Password

const uri = "mongodb+srv://simpleDBUser:Your_Password@cluster0.a8gl3xd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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

        // const database = client.db("usersDB");
        // const usersCollection = database.collection("users")

        const usersCollection = client.db("usersDB").collection("users");

        // Set User Data (Create)
        app.post("/users", async(req, res) => {
            console.log(req.body);
            const newUser = req.body;
            const result = await usersCollection.insertOne(newUser);
            res.send(result);
        })

        // Get All Users Data (Read)
        app.get("/users", async(req, res) => {
            const cursor = usersCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        // Delete user data (Delete)
        app.delete('/users/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: new ObjectId(id)}
            const result = await usersCollection.deleteOne(query);
            res.send(result);
        })

        // Get user data (Read)
        app.get("/users/:id", async(req, res) => {
            const id = req.params.id;
            const query = {_id: new ObjectId(id)}
            const result = await usersCollection.findOne(query)
            res.send(result);
        })

        // Update user data
        app.put("/users/:id", async(req, res) => {
            const id = req.params.id;
            const filter = {_id: new ObjectId(id)}
            const user = req.body;
            const updatedDoc = {
                $set: {
                    name: user.name,
                    email: user.email,
                }
            }
            const options = { upsert: true };
            const result = await usersCollection.updateOne(filter, updatedDoc, options);
            res.send(result)
        })

        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } 
    finally {

    }
}

run().catch(console.dir)

app.get("/", (req, res) => {
    res.send("Hello, world!")
})

app.listen(port, () => {
    console.log(`Server is running on PORT: http://localhost:${port}/`)
})