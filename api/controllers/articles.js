const mongoose = require('mongoose');
const Article = require('../models/article');
const Category = require('../models/category');

module.exports = {
    getAllArticles: (req, res) => {
        Article.find().populate('categoryId', 'title').then((articles) => {
            res.status(200).json({
                articles
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
       
    },
    createArticle: (req, res) => {
        console.log(req.file);
        const { path: image } = req.file;
        const { title, description, content, categoryId } = req.body;
    
        Category.findById(categoryId)
            .then((category) => {
                if (!category) {
                    return res.status(404).json({
                        message: 'Category not found'
                    });
                }
                const article = new Article({
                    _id: new mongoose.Types.ObjectId(),
                    title,
                    description,
                    content,
                    categoryId,
                    image: image.replace('\\', '/')
                });
    
                article.save().then(() => {
                    res.status(200).json({
                        message: 'Created article'
                    });
                })
                .catch(error => {
                    if (!res.headersSent) {
                        res.status(500).json({
                            error
                        });
                    }
                });
            })
            
    },
    getArticle: (req, res) => {
        const articleId = req.params.articleId;

        Article.findById(articleId).then((article) => {
            res.status(200).json({
                article
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
    },
    updateArticle: (req, res) => {
        const articleId = req.params.articleId;
        const { categoryId } = req.body;

        Article.findById(articleId)
        .then((article) => {
            if (!article) {
                return res.status(404).json({
                    message: 'Article not found'
                });
            }

            if (categoryId) {
                return Category.findById(categoryId)
                    .then((category) => {
                        if (!category) {
                            return res.status(404).json({
                                message: 'Category not found'
                            });
                        }

                        return Article.findByIdAndUpdate(articleId, req.body, { new: true })
                            .then((updatedArticle) => {
                                res.status(200).json({
                                    message: 'Article Updated',
                                    article: updatedArticle
                                });
                            })
                            .catch(error => {
                                res.status(500).json({ error });
                            });
                    })
                    .catch(error => {
                        res.status(500).json({ error });
                    });
            } else {
                return Article.findByIdAndUpdate(articleId, req.body, { new: true })
                    .then((updatedArticle) => {
                        res.status(200).json({
                            message: 'Article Updated',
                            article: updatedArticle
                        });
                    })
                    .catch(error => {
                        res.status(500).json({ error });
                    });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
    },
    deleteArticle: (req, res) => {
        const articleId = req.params.articleId;

        Article.findByIdAndDelete(articleId).then((article) => {
            if (!article) {
                return res.status(404).json({ message: 'Article not found' });
            }
            res.status(200).json({ message: `Article _id: ${articleId} Deleted` });
        }).catch(error => {
            res.status(500).json({ error });
        });
    }

}