const productModel = require('../models/Product');

const createProduct = async (req, res, next) => {
    try {
        const createdProduct = await productModel.create(req.body);
        res.status(201).json(createdProduct);
    } catch (error) {
        next(error);
    }
};

const getProducts = async (req, res, next) => {
    await productModel.find({});
    res.status(200);
};

module.exports = { createProduct, getProducts };
