const {validationResult} = require('express-validator');
// const path = require('path');
// const fs = require('fs');
const Product = require('../models/product');

exports.createProduct = (req, res, next) => {
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

    const Create = new Product({
        productName: productName,
        productType: productType,
        blend: {origin: 'Gayo', postHarvest: 'Wet Hull', percentage: '70'},
        // origin: origin,
        // postHarvest: postHarvest,
        // percentage: percentage,
        productStory: productStory,
        price: price,
        stock: stock,
        productPhoto: productPhoto,
        ecommerceLink: ecommerceLink,
        author: {uid: 1, name: 'Khairunnisa'}
    })

    Create.save()
    .then(result => {
        res.status(201).json({
            message: 'Create Product Success',
            data: result
        });
    })
    .catch(err => {
        console.log('err: ', err);
    });
}

exports.getAllProducts = (req, res, next) => {
    // const currentPage = req.query.page || 1;
    // const perPage = req.query.perPage || 5;
    // let totalItems;

    Product.find()
    // .countDocuments()
    // .then(count => {
    //     totalItems = count;
    //     return BlogPost.find()
    //     .skip((parseInt(currentPage) - 1) * parseInt(perPage))
    //     .limit(parseInt(perPage));
    // })
    .then(result => {
        res.status(200).json({
            message: 'Data Product Berhasil dipanggil',
            data: result,
            // total_data: totalItems,
            // per_page: parseInt(perPage),
            // current_page: parseInt(currentPage)
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.getProductById = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId)
    .then(result => {
        if(!result) {
            const error = new Error('Product tidak ditemukan');
            error.errorStatus = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Product Berhasil Dipanggil',
            data: result,
        })
    })
    .catch(err => {
        next(err);
    })
}

// exports.updateBlogPost = (req, res, next) => {
//     const errors = validationResult(req);

//     if(!errors.isEmpty()){
//         const err = new Error('Input value tidak sesuai');
//         err.errorStatus = 400;
//         err.data = errors.array();
//         throw err;
//     }

//     if(!req.file){
//         const err = new Error('Image Harus Di Upload');
//         err.errorStatus = 422;
//         throw err;
//     }

//     const title = req.body.title;
//     const image = req.file.path;
//     const body = req.body.body;
//     const postId = req.params.postId;

//     BlogPost.findById(postId)
//     .then(post => {
//         if(!post){
//             const err = new Error('Blog Post tidak ditemukan');
//             err.errorStatus = 404;
//             throw err;
//         }

//         post.title = title;
//         post.body = body;
//         post.image = image;

//         return post.save();
//     })
//     .then(result => {
//         res.status(200).json({
//             message: 'Update Sukses',
//             data: result
//         })
//     })
//     .catch(err => {
//         next(err);
//     })
    
// }

// exports.deleteBlogPost = (req, res, next) => {
//     const postId = req.params.postId;

//     BlogPost.findById(postId)
//     .then(post => {
//         if(!post){
//             const error = new Error('Blog Post tidak ditemukan');
//             error.errorStatus = 404;
//             throw error;
//         }

//         removeImage(post.image);
//         return BlogPost.findByIdAndRemove(postId);
//     })
//     .then(result => {
//         res.status(200).json({
//             message: 'Hapus Blog Post Berhasil',
//             data: result
//         })
//     })
//     .catch(err => {
//         next(err);
//     })
// }

// const removeImage = (filePath) => {
//     console.log('filePath', filePath);
//     console.log('dir name: ', __dirname);
//     // E:/Data Document/IPB '55/Website Sangrai Kopi/mern-api/src/controllersimages/1637601079898-wallpaper-670887.jpg
//     filePath = path.join(__dirname, '../..', filePath);
//     fs.unlink(filePath, err => console.log(err));
// }