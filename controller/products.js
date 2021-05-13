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
    try {
        const allProducts = await productModel.find({});
        res.status(200).json(allProducts);
    } catch (error) {
        next(error);
    }
};

const getProductById = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const product = await productModel.findById(productId);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).send();
        }
    } catch (error) {
        next(error);
    }
};

const deleteProduct = async (req, res, next) => {
    const productId = req.params.productId;
    const result = await productModel.findByIdAndDelete(productId);

    if (result) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
};

module.exports = { createProduct, getProducts, getProductById, deleteProduct };
