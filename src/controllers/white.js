const WhiteScheme = require('../models/white');
const Product = require('../models/product');
const mongoose = require('mongoose');
// const toId = mongoose.Types.ObjectId;
exports.createWhite = (req, res, next) => {
    const productId = req.params.productId;
    const {title, dose, yield, brewTime, temp, cappucino, latte, batchdate} = req.body;

    Product.findById(productId, async function(err, product){
        let White = new WhiteScheme({
            title: title,
            dose: dose,
            yield: yield,
            brewTime: brewTime,
            temp: temp,
            cappucino: cappucino,
            latte:latte,
            product: product._id,
            batchdate: batchdate
        });

        await White.save(async function(err) {
            if(err) next(err);
            product.white.push(White._id);
            await product.save();
            res.status(200).json({
                message:"berhasil",
                data:{product, White}
            })
        })
    });
}

exports.dropWhite = async (req, res, next) => {
    const idProduct = req.params.productId;
    const { idWhite } = req.body;
    try{
    const proc = await Product.findOneAndUpdate({
        _id : idProduct
    },
    {
        $pull : {
            white: idWhite,
        },
    })
    res.json(proc);
} catch(err) {
    return next(err)
}
    try{
    const del = await WhiteScheme.findOneAndDelete({
        _id : idWhite
    })
    res.json(del);
} catch(err) {
    return next(err);
}
}

exports.getAllWhite = async (req,res,next) => {
    const idProduct = req.params.productId;
    try{
        proc = await WhiteScheme.find({product : idProduct});
        res.json(proc);
    } catch(err) {
        return next(err);
    }
}

exports.editWhite = async (req,res,next) => {
    const idRecipe = req.params.recipeId;
    const {title, dose, yield, brewTime, temp, cappucino, latte} = req.body;
    const update = {title : title, dose : dose, yield : yield, brewTime : brewTime, temp : temp,
    cappucino : cappucino, latte : latte}
    try{
        const proc = await WhiteScheme.findOneAndUpdate({_id: idRecipe}, update);
        res.json(proc);
    } catch (err)
    {
        return next(err);
    }
}
