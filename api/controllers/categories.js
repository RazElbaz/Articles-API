const Category = require('../models/category');
const mongoose = require('mongoose');


module.exports = {
    getAllCategories: (req, res) => {
        Category.find().then((categories) => {
            res.status(200).json({
                categories
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
    },
    createCategory: (req, res) => {
        const { title, description } = req.body;

        const category = new Category({
            _id: new mongoose.Types.ObjectId,
            title, 
            description
        });

        category.save().then(() => {
            res.status(200).json({
                message: "Created category"
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
    },
    getCategory: (req, res) => {
        const categoryId = req.params.categoryId;

        Category.findById(categoryId).then((category) => {
            res.status(200).json({
                category
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
    },
    updateCategory: (req, res) => {
        const categoryId = req.params.categoryId;
        
        Category.findByIdAndUpdate(categoryId, req.body, { new: true }).then((category) => {  // { new: true } returns the updated document
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            return res.status(200).json({message: "Category updated"})
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
    },
    deleteCategory: (req, res) => {
        const categoryId = req.params.categoryId;

        Category.findByIdAndDelete(categoryId).then((category) => {
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.status(200).json({ message: `Category _id: ${categoryId} Deleted` });
        }).catch(error => {
            res.status(500).json({ error });
        });
    }
}