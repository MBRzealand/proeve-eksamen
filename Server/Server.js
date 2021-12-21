require('dotenv').config({path:"./.env"})
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes/routes");

const app = express();

app.use(express.json());

mongoose.connect(
    process.env.DB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

app.use(cors());
app.use(Router);

app.listen(3000, () => {
    console.log("Server is running...");
});