const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    _id: Schema.Types.ObjectId,
    productName: {
        type: String,
        required: true
    },
    productType: {
        type: String,
        required: true
    },
    blend:{
        type: Object,
        required: true
    },
    // origin: {
    //     type: String,
    //     required: true
    // },
    // postHarvest: {
    //     type: String,
    //     required: true
    // },
    // percentage: {
    //     type: Number,
    //     required: true
    // },
    productStory: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    productPhoto: {
        type: String,
        require: true
    },
    ecommerceLink: {
        type: String,
        required: true
    },
    author: {
        type: Object,
        required: true
    },
    white:[{type: Schema.Types.ObjectId, ref: 'white'}],
    black:[{type: Schema.Types.ObjectId, ref: 'black'}],
    blend:[{
        type: Schema.Types.ObjectId,
        ref :'blend'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', Product);