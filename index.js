require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const app = express();
const cors = require('cors');

const authRoutes = require('./src/routes/auth');
const productRoutes = require('./src/routes/product');
const whiteRoutes = require('./src/routes/white');
const blackRoutes = require('./src/routes/black');
const port = '0.0.0.0';

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if(
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ){
        cb(null, true);
    } else {
        cb(null, false);
    }
}

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('productPhoto'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/auth', authRoutes);
app.use('/product', productRoutes);
app.use('/white', whiteRoutes);
app.use('/black', blackRoutes);


app.use((error, req, res, next) => {
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;

    res.status(status).json({message: message, data: data});
})

app.listen(process.env.PORT, port, () => console.log('Connection Success'));

mongoose.connect(process.env.MONGODB_URL,
    {useNewUrlParser: true})
.then((db) => {
    console.log("berhasil cok")
})
.catch(err => console.log(err));
