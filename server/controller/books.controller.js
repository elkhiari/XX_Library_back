const Books = require("../model/books.model");

const add_Books = async (req, res) => {
    try {
        const {title,author,cover,pages,description,Url,categories} = req.body;
        const books = new Books({
            title,
            author,
            cover,
            pages,
            publisher: req.user._id,
            description,
            Url,
            categories
        })
        await books.save();
        res.status(201).json({message:"books published success",books})
    } catch (error) {
        res.status(500).json({message:"internal server error"})
        console.log(error)
    }
}

const get_Books = async (req, res) => {
    try {
        const books = await Books.find().populate("publisher",{password:0}).populate("categories");
        res.status(200).json({books})
    } catch (error) {
        res.status(500).json({message:"internal server error"})
        console.log(error)
    }
}

get_Books_for_Admin = async (req, res) => {
    try {
        const books = await Books.find().populate("publisher",{password:0}).populate("categories");
        res.status(200).json({books})
    } catch (error) {
        res.status(500).json({message:"internal server error"})
        console.log(error)
    }
}

const get_my_Books = async (req, res) => {
    try {
        const books = await Books.find({publisher:req.user._id}).populate("publisher",{password:0}).populate("categories");
        res.status(200).json({books})
    } catch (error) {
        res.status(500).json({message:"internal server error"})
        console.log(error)
    }
}

get_book_by_category = async (req, res) => {
    try {
        const {id} = req.params;
        const books = await Books.find({categories:id}).populate("publisher",{password:0}).populate("categories");
        res.status(200).json({books})
    } catch (error) {
        res.status(500).json({message:"internal server error"})
        console.log(error)
    }
}


set_status_books = async (req, res) => {
    try {
        const {id} = req.params;
        const Books = await Books.findById(id);
        if(!Books) return res.status(404).json({message:"books not found"})
        Books.status = Books.status === "pending" ? "Approved" : (Books.status === "Approved" ? "blocked" : "Approved");
        await Books.save();
        res.status(200).json({message:"books status updated success"})
    } catch (error) {
        res.status(500).json({message:"internal server error"})
        console.log(error)
    }
}



const get_Books_by_id = async (req, res) => {
    try {
        const {id} = req.params;
        const books = await Books.findById(id).populate("publisher",{password:0}).populate("categories");
        res.status(200).json({books})
    } catch (error) {
        res.status(500).json({message:"internal server error"})
        console.log(error)
    }
}

const delete_Books = async (req, res) => {
    try {
        const {id} = req.params;
        const books = await Books.findByIdAndDelete(id);
        if(!books) return res.status(404).json({message:"books not found"})
        res.status(200).json({message:"books deleted success"})
    } catch (error) {
        res.status(500).json({message:"internal server error"})
        console.log(error)
    }
}

const update_Books = async (req, res) => {
    try {
        const {id} = req.params;
        const {title,author,cover,pages,description,Url,categories} = req.body;
        const books = await Books.findById(id).populate("publisher",{password:0}).populate("categories");
        if(!books) return res.status(404).json({message:"books not found"})
        if(books.publisher._id.toString()  === req.user._id.toString() || req.params.role === 'admin'){
        books.title = title;
        books.author = author;
        books.cover = cover;
        books.pages = pages;
        books.description = description;
        books.Url = Url;
        books.categories = categories;
        await books.save();
        res.status(200).json({message:"books updated success",books})
        }
        else{
            res.status(401).json({message:"Unauthorized"})
        }
    } catch (error) {
        res.status(500).json({message:"internal server error"})
        console.log(error)
    }
}


const incriment_downloads = async (req, res) => {
    try {
        const {id} = req.params;
        const books = await Books.findById(id);
        if(!books) return res.status(404).json({message:"books not found"})
        books.downloads = books.downloads + 1;
        await books.save();
        res.status(200).json({message:"downloads incrimented success"})
    } catch (error) {
        res.status(500).json({message:"internal server error"})
        console.log(error)
    }
}

const get_rendom_books = async (req, res) => {
    try {
        const books = await Books.aggregate([{ $sample: { size: 20 } },]).populate("publisher", { password: 0 }).populate("categories");
        res.status(200).json({books})
    } catch (error) {
        res.status(500).json({message:"internal server error"})
        console.log(error)
    }
}


const get_most_downloads_books = async (req, res) => {
    try {
        const books = await Books.find().sort({downloads:-1}).limit(20).populate("publisher", { password: 0 }).populate("categories");
        res.status(200).json({books})
    } catch (error) {
        res.status(500).json({message:"internal server error"})
        console.log(error)
    }
}








module.exports = {get_Books,add_Books,get_Books_by_id,update_Books,delete_Books,get_Books_for_Admin,set_status_books,get_my_Books,get_book_by_category,incriment_downloads,get_rendom_books,get_most_downloads_books}