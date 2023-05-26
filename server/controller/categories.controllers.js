const Categories = require("../model/categories.models");

const add_categories = async (req, res) => {
    try {
        const {name,description,icon} = req.body;
        const categories = new Categories({
            name,description,icon
        })
        await categories.save();
        res.status(201).json({message:"categories addes success",categories})
    } catch (error) {
        res.status(500).json({message:"internal server error"})
        console.log(error)
    }
}

const get_categories = async (req, res) => {
    try {
        const categories = await Categories.find();
        res.status(200).json({categories})
    } catch (error) {
        res.status(500).json({message:"internal server error"})
        console.log(error)
    }
}

const get_categories_by_id = async (req, res) => {
    try {
        const {id} = req.params;
        const categories = await Categories.findById(id);
        res.status(200).json({categories})
    } catch (error) {
        res.status(500).json({message:"internal server error"})
        console.log(error)
    }
}

const update_categories = async (req, res) => {
    try {
        const {id} = req.params;
        const {name,description,icon} = req.body;
        const categories = await Categories.findByIdAndUpdate(id,{name,description,icon});
        res.status(200).json({message:"categories updated success",categories})
    } catch (error) {
        res.status(500).json({message:"internal server error"})
        console.log(error)
    }
}


module.exports = {get_categories,add_categories,get_categories_by_id,update_categories}