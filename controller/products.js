const productModel = require('../models/Product');

const createProduct = (req, res, next) => {
    let createdProduct = productModel.create(req.body);
    res.status(201).json(createdProduct);
};

module.exports = { createProduct };
