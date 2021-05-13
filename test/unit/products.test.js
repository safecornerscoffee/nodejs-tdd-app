const productController = require('../../controller/products');
const productModel = require('../../models/Product');
const httpMocks = require('node-mocks-http');
const newProduct = require('../data/new-product.json');
const allProducts = require('../data/all-products.json');

productModel.create = jest.fn();
productModel.find = jest.fn();
productModel.findById = jest.fn();
productModel.findByIdAndUpdate = jest.fn();

const productId = '609bd4e1ac76bfc29c2b103b';
let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe('ProductController.create Function', () => {
    beforeEach(() => {
        req.body = newProduct;
    });
    it('should have a createProduct function', () => {
        expect(typeof productController.createProduct).toBe('function');
    });

    it('should call Product.create', () => {
        productController.createProduct(req, res, next);
        expect(productModel.create).toBeCalledWith(newProduct);
    });

    it('should returning 201 status code', async () => {
        await productController.createProduct(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it('should returning json in response body', async () => {
        productModel.create.mockReturnValue(newProduct);
        await productController.createProduct(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newProduct);
    });

    it('should handle errors', async () => {
        const errorMessage = {
            message:
                'description: ValidatorError: Path `description` is required.',
        };
        const rejectedPromise = Promise.reject(errorMessage);
        productModel.create.mockReturnValue(rejectedPromise);
        await productController.createProduct(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});

describe('ProductController.getProducts Function', () => {
    it('should have a getProducts function', () => {
        expect(typeof productController.getProducts).toBe('function');
    });

    it('should call Product.find({})', async () => {
        await productController.getProducts(req, res, next);
        expect(productModel.find).toHaveBeenCalledWith({});
    });

    it('should return 200 status code', async () => {
        await productController.getProducts(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled).toBeTruthy();
    });

    it('should return json in response.body', async () => {
        productModel.find.mockReturnValue(allProducts);
        req.body = allProducts;
        await productController.getProducts(req, res, next);
        expect(res._getJSONData()).toStrictEqual(allProducts);
    });

    it('should handle errors', async () => {
        const errorMessage = { message: 'Error: finding product data' };
        const rejectedPromise = Promise.reject(errorMessage);
        productModel.find.mockReturnValue(rejectedPromise);
        await productController.getProducts(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});

describe('ProductController.getProductById Function', () => {
    it('ProductController should have getProductById function', () => {
        expect(typeof productController.getProductById).toBe('function');
    });

    it('should call Product.findById', async () => {
        req.params.productId = productId;
        await productController.getProductById(req, res, next);
        expect(productModel.findById).toBeCalledWith(productId);
    });

    it('should return json in response.body', async () => {
        productModel.findById.mockReturnValue(newProduct);
        await productController.getProductById(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newProduct);
    });

    it(`should return 404 status code when item doesn't exist`, async () => {
        productModel.findById.mockReturnValue(null);
        await productController.getProductById(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled).toBeTruthy();
    });

    it('should handle errors', async () => {
        const errorMessage = { message: 'error' };
        const rejectedPromise = Promise.reject(errorMessage);
        productModel.findById.mockReturnValue(rejectedPromise);
        await productController.getProductById(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});

describe('ProductController.updateProduct Function', () => {
    it('ProductController should have an updateProduct function', () => {
        expect(typeof productController.updateProduct).toBe('function');
    });

    it('should have call findByIdAndUpdate function', async () => {
        req.params.productId = productId;
        req.body = newProduct;
        await productController.updateProduct(req, res, next);
        expect(productModel.findByIdAndUpdate).toBeCalledWith(
            productId,
            newProduct,
            { new: true }
        );
    });

    it('should return 200 status code', async () => {
        req.params.productId = productId;
        req.body = newProduct;
        productModel.findByIdAndUpdate.mockReturnValue(newProduct);
        await productController.updateProduct(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(newProduct);
    });

});
