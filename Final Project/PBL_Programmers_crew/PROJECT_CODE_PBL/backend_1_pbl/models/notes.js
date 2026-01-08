const mongoose = require('mongoose');
const notesSchema = new mongoose.Schema(
    {
        domain: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

const notes = mongoose.model("notes", notesSchema);
module.exports = notes;