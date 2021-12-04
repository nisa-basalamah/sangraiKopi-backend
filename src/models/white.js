const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WhiteSchema = new Schema({
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
    cappucino:{
        type: Number,
        required: true
    },
    latte:{
        type: Number,
        required: true
    },
    product:{type: Schema.Types.ObjectId, ref:'Product'}
})

module.exports = mongoose.model('white', WhiteSchema )