const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlendSchema = new Schema({
    origin : {
        type: String,
        required: true
    },
    postprocess : {
        type: String,
        required : true
    },
    percentage:{
        type: Number,
        required : true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
})

module.exports = mongoose.model('blend', BlendSchema)