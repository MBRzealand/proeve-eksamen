const express = require("express");
const beskedModel = require("../models/beskeder");
const brugerModel = require("../models/brugere");
const app = express();

app.get("/beskeder", async (request, response) => {
    const beskeder = await beskedModel.find({});

    try {
        response.send(beskeder);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.post("/besked", async (request, response) => {
    const besked = new beskedModel(request.body);

    try {
        await besked.save();
        response.send(besked);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/brugere", async (request, response) => {
    const brugere = await brugerModel.find({});

    try {
        response.send(brugere);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.post("/bruger", async (request, response) => {
    const bruger = new brugerModel(request.body);

    try {
        await bruger.save();
        response.send(bruger);
    } catch (error) {
        response.status(500).send(error);
    }
});


module.exports = app;