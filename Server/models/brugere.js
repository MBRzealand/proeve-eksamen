const mongoose = require("mongoose");

const BrugerSchema = new mongoose.Schema({

    Navn: {
        type: String,
        required: true,
    },
    Kodeord: {
        type: String,
        required: true,
    }
});

const Bruger = mongoose.model("Bruger", BrugerSchema);

module.exports = Bruger;