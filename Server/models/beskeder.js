const mongoose = require("mongoose");

const BeskedSchema = new mongoose.Schema({
    afsender: {
        type: String,
        required: true,
    },
    besked: {
        type: String,
        required: true,
    },
    dato: {
        type: String,
        required: true,
    },
    tidspunkt: {
        type: String,
        required: true,
    }
});

const Besked = mongoose.model("Besked", BeskedSchema);

module.exports = Besked;