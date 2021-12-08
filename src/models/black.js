const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlackSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    dose:{
        type: Number,
        required: true
    },
    yield:{
        type: Number,
        required: true
    },
    brewTime:{
        type: Number,
        required: true
    },
    temp:{
        type: Number,
        required: true
    },
    americano:{
        type: Number,
        required: true
    },
    product:{
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    batchdate:{
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('black', BlackSchema )