const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const dotenv = require("dotenv");
const cors = require("cors");

const usersRoute = require("./routes/users");
const itemsRoute = require("./routes/items");

dotenv.config();

const port = process.env.PORT || 3000;

const dbURI = process.env.DB_URI;

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB", err);
    });

app.use("/users", usersRoute);
app.use("/items", itemsRoute);

// Start the server
app.listen(port, () => {
    console.log("Server is running on port ", port);
});