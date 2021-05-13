const request = require('supertest');
const app = require('../../server');

const newProductData = require('../data/new-product.json');

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
