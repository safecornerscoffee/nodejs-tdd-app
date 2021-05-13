const request = require('supertest');
const app = require('../../server');

const newProductData = require('../data/new-product.json');
const allProductsData = require('../data/all-products.json');

let firstProduct;

it('POST /api/products', async () => {
    const response = await request(app)
        .post('/api/products')
        .send(newProductData);
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe(newProductData.name);
    expect(response.body.description).toBe(newProductData.description);
});

it('should return 500 status code when POST /api/products failed', async () => {
    const response = await request(app)
        .post('/api/products')
        .send({ name: 'galaxy' });
    expect(response.status).toBe(500);
    expect(response.body).toStrictEqual({
        message:
            'Product validation failed: description: Path `description` is required.',
    });
});

it('GET /api/products', async () => {
    // allProductsData.map(async (product) => {
    //     await request(app).post('/api/products').send(product);
    // });

    const response = await request(app).get('/api/products');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].name).toBeDefined();
    expect(response.body[0].description).toBeDefined();
    firstProduct = response.body[0];
});

it('GET /api/products/:productId', async () => {
    const response = await request(app)
        .get(`/api/products/${firstProduct._id}`)
        .send();
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(firstProduct.name);
    expect(response.body.description).toBe(firstProduct.description);
});

it('GET /api/products/:productId return 404 status code when item doesnt exist', async () => {
    const response = await request(app).get(
        `/api/products/609bd4e1ac76bfc29c2b103b`
    );
    expect(response.statusCode).toBe(404);
});

it('DELETE /api/products/:productId return 200', async () => {
    const response = await request(app)
        .delete(`/api/products/${firstProduct._id}`)
        .send();
    expect(response.statusCode).toBe(200);
});

it('DELETE /api/products/:productId return 404', async () => {
    const response = await request(app)
        .delete(`/api/products/${firstProduct._id}`)
        .send();
    expect(response.statusCode).toBe(404);
});
