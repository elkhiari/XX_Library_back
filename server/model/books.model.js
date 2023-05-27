const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    cover: {
        type: String,
        required: true,
        trim: true,
    },
    pages: {
        type: Number,
        required: true,
        trim: true,
        lowercase: true,
    },
    publisher: {    
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'userdb',
    },
    published_at: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    Url: {
        type: String,
        trim: true,
        lowercase: true,
    },
    categories: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'categories',
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'blocked'],
        default: 'approved',
    },
    downloads: {
        type: Number,
        default: 0,
    }

})

const Books = mongoose.model('Books', booksSchema);
module.exports = Books;