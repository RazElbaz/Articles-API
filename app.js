const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const checkAuth = require('./api/middlewares/checkAuth');

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@articles-api.ohryhhh.mongodb.net/?retryWrites=true&w=majority&appName=articles-api`);

mongoose.connection.on('connected', () => {
    console.log("MongoDB Connected!");
});

const articleRoutes = require('./api/routes/articles');
const categoriesRoutes = require('./api/routes/categories');
const usersRoutes = require('./api/routes/users');

app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next(); // next( ) function is a callback that, when invoked, passes control to the next middleware function.
});

//Routes
app.use('/articles', articleRoutes);
app.use('/categories', checkAuth, categoriesRoutes);
app.use('/users', usersRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;