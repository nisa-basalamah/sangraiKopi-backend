const {validationResult} = require('express-validator');
const path = require('path');
const fs = require('fs');
const Product = require('../models/product');
const Blend = require('../models/blend');
const mongoose = require('mongoose');
const white = require('../models/white');

exports.createProduct = async (req, res, next) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        const err = new Error('Input value tidak sesuai');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    if(!req.file){
        const err = new Error('Image Harus Di Upload');
        err.errorStatus = 422;
        throw err;
    }

    const productName = req.body.productName;
    const productType = req.body.productType;
    // const blend = req.body.blend;
    const productStory = req.body.productStory;
    const price = req.body.price;
    const stock = req.body.stock;
    const productPhoto = req.file.path.split(path.sep).join(path.posix.sep);
    const ecommerceLink = req.body.ecommerceLink;
    const size = req.body.size;
    // const author = req.body.author;
   
    
    Product.create({
        _id : new mongoose.Types.ObjectId(),
        productName : productName,
        productType : productType,
        productStory: productStory,
        productPhoto : productPhoto,
        price: price,
        stock: stock,
        size: size,
        ecommerceLink: ecommerceLink,
        author: {
            name: "Junaedi"
        }
    }, function(err,result){
        if(err) next(err);
        res.status(200).json({
            result
        })
    })

    // Blend.create(blend, function(err, result) {
    //     if(err) next(err);
    //     console.log(result);
    //     id = result.map(obj => mongoose.Types.ObjectId(obj._id));
    //     console.log(id);
    //     var Prod = new Product();
    //     Prod._id = new mongoose.Types.ObjectId();
    //     Prod.productName = productName;
    //     Prod.productType = productType;
    //     Prod.productStory = productStory;
    //     Prod.price = price;
    //     Prod.stock = stock;
    //     Prod.productPhoto = productPhoto;
    //     Prod.ecommerceLink = ecommerceLink;
    //     Prod.author = {uid: 1, name: 'Khairunnisa'};
    //     Prod.blend.push(id);
    //     Product.save(function(err,result){
    //         if(err) next(err);
    //         res.status(200).json({
    //             message:"berhasil cok",
    //             data: result
    //         })
    //     })
    // })
}
exports.getAllProductsPagination = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = req.query.perPage || 3;
    let totalItems;

    Product.find()
    .countDocuments()
    .then(count => {
        totalItems = count;
        return Product.find()
        .skip((parseInt(currentPage) - 1) * parseInt(perPage))
        .limit(parseInt(perPage));
    })
    .then(result => {
        res.status(200).json({
            message: 'Data Product Berhasil dipanggil',
            data: result,
            total_data: totalItems,
            per_page: parseInt(perPage),
            current_page: parseInt(currentPage)
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.getAllProduct = (req, res, next) => {
    Product.find({})
    .populate('productPhoto')
    .populate('blend')
    .populate('white')
    .populate('black')
    .exec(function(err, result) {
        if(err)
        { res.status(400).json({
            message:"Finding product failed",
            error: err
        });
        next(err);
        }
        res.status(200).json(result)
    })
}

exports.getProductById = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId)
    .populate("white")
    .populate("black")
    .exec((err,result) => {
        if(err) {
            res.status(400).json({
                message:"Product not found",
                error:err
            })
            next(err);
        }
        res.status(200).json(result);
    });
}

exports.updateProduct = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const err = new Error('Input value tidak sesuai');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    if(!req.file){
        const err = new Error('Image Harus Di Upload');
        err.errorStatus = 422;
        throw err;
    }

    const productName = req.body.productName;
    const productType = req.body.productType;
    // const blend = req.body.blend;
    // const origin = req.body.origin;
    // const postHarvest = req.body.postHarvest;
    // const percentage = req.body.percentage;
    const productStory = req.body.productStory;
    const price = req.body.price;
    const stock = req.body.stock;
    const productPhoto = req.file.path;
    const ecommerceLink = req.body.ecommerceLink;
    // const author = req.body.author;
    const productId = req.params.productId;

    Product.findById(productId)
    .then(product => {
        if(!product){
            const err = new Error('Product tidak ditemukan');
            err.errorStatus = 404;
            throw err;
        }

        product.productName = productName;
        product.productType = productType;
        // product.blend = blend;
        // product.origin = origin;
        // product.postHarvest = postHarvest;
        // product.percentage = percentage;
        product.productStory = productStory;
        product.price = price;
        product.stock = stock;
        product.productPhoto = productPhoto;
        product.ecommerceLink = ecommerceLink;
        // product.author = author;

        return product.save();
    })
    .then(result => {
        res.status(200).json({
            message: 'Update Sukses',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
    
}

exports.deleteProduct = (req, res, next) => {
    const productId = req.params.productId;

    Product.findById(productId)
    .then(product => {
        if(!product){
            const error = new Error('Product tidak ditemukan');
            error.errorStatus = 404;
            throw error;
        }

        removeImage(product.productPhoto);
        return Product.findByIdAndRemove(productId);
    })
    .then(result => {
        res.status(200).json({
            message: 'Hapus Product Berhasil',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}

const removeImage = (filePath) => {
    console.log('filePath', filePath);
    console.log('dir name: ', __dirname);
    // E:/Data Document/IPB '55/Website Sangrai Kopi/mern-api/src/controllersimages/1637601079898-wallpaper-670887.jpg
    filePath = path.join(__dirname, '../..', filePath);
    fs.unlink(filePath, err => console.log(err));
}