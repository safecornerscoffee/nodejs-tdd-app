const express = require('express');

const productRouter = express.Router();
const productController = require('./controller/products');

const userRouter = express.Router();
const userController = require('./controller/users');

productRouter.post('/', productController.createProduct);
productRouter.get('/', productController.getProducts);
productRouter.get('/:productId', productController.getProductById);

userRouter.post('/signup', userController.signUp);
userRouter.post('/signin', userController.signIn);

module.exports = { productRouter, userRouter };
