const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 3000;

app.use(cors()); // Enables CORS (Cross-Origin Resource Sharing), which allows your server to accept requests from other origins (domains/ports).
app.use(express.json()) // Parses incoming requests with JSON payloads and makes the data available in req.body.

const users = [
    { id: 1, name: "Tahmid", email: "tahmid@myself.com"},
    { id: 2, name: "Tahmid", email: "tahmid@engineer.com"},
    { id: 3, name: "Tahmid", email: "tahmid@programmer.net"},
]

app.get("/users", (req, res) => {
    res.send(users);
})

app.post("/users", (req, res) => {
    console.log("User post method")
    console.log(req.body)
    const newUser = req.body;
    newUser.id = users.length + 1;
    res.send(newUser)

    // Add data to the database 
    users.push(newUser);
})

app.listen(port, () => {
    console.log(`Server is running on PORT: http://localhost:${port}/users/`)
})