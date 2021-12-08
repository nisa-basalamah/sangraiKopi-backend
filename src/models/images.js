mongoose = require('mongoose');
Schema = mongoose.Schema;

const ImagesSchema = new Schema({
    fileName : String,

}, {strict : false});

module.exports = mongoose.model('GridFs', ImagesSchema, 'uploaded_images.files')