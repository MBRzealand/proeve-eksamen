const mongoose = require("mongoose");

const BrugerSchema = new mongoose.Schema({

    Navn: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Foedselsdato: {
        type: String,
        required: true,
    }
});

const Bruger = mongoose.model("Bruger", BrugerSchema);

module.exports = Bruger;