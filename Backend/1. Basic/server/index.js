const express = require('express');
const cors = require('cors');
const phones = require("./data/phones.json")
const app = express();
const port = process.env.PORT || 3000;

app.use(cors())

app.get("/", (req, res) => {
    res.send("This is my first server.")
})

app.get("/phones", (req, res) => {
    res.send(phones);
})

app.get("/phones/:id", (req, res) => {
    const id = parseInt(req.params.id);
    console.log(`The requested id: ${id}`)
    const phone = phones.find(phone => phone.id === id) || {};
    res.send(phone);
})

app.listen(port, () => {
    console.log(`Server is running on PORT: http://localhost:${port}/`)
})