const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    icon: {
        type: String,
        trim: true,
    }
})

module.exports = mongoose.model('categories', categoriesSchema);
