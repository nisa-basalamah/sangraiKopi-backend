const BlackScheme = require('../models/black');
const Product = require('../models/product');
const mongoose = require('mongoose');
// const toId = mongoose.Types.ObjectId;
exports.createBlack = (req, res, next) => {
    const productId = req.params.productId;
    const {title, dose, yield, brewTime, temp, americano} = req.body;

    Product.findById(productId, async function(err, product){
        let Black = new BlackScheme({
            title: title,
            dose: dose,
            yield: yield,
            brewTime: brewTime,
            temp: temp,
            americano: americano,
            product: product._id
        });
        try{
        const proc = await Black.save();
        res.json(proc);
        } catch (error) {
            next(error);
        }
        try{
        product.black.push(Black._id)
        const prod = await product.save() 
        res.json(prod);
        } catch(error) {
            next(error);
        }
    });
}

exports.dropBlack = async (req, res, next) => {
    const idProduct = req.params.productId;
    const { idBlack } = req.body;
    try{
    const proc = await Product.findOneAndUpdate({
        _id : idProduct
    },
    {
        $pull : {
            black: idBlack,
        },
    })
    res.json(proc);
} catch(err) {
    return next(err)
}
    try{
    const del = await BlackScheme.findOneAndDelete({
        _id : idBlack
    })
    res.json(del);
} catch(err) {
    return next(err);
}
}

exports.getAllBlack = async (req,res,next) => {
    const idProduct = req.params.productId;
    try{
        proc = await BlackScheme.find({product : idProduct});
        res.json(proc);
    } catch(err) {
        return next(err);
    }
}

exports.editBlack = async (req,res,next) => {
    const idRecipe = req.params.recipeId;
    const {title, dose, yield, brewTime, temp, americano} = req.body;
    const update = {title : title, dose : dose, yield : yield, brewTime : brewTime, temp : temp,
    americano : americano}
    try{
        const proc = await BlackScheme.findOneAndUpdate({_id : idRecipe}, update);
        res.json(proc);
    } catch (err)
    {
        return next(err);
    }
}
