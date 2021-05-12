const productModel = require('../models/Product');

const createProduct = (req, res, next) => {
    productModel.create(req.body);
};

module.exports = { createProduct };
