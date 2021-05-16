const request = require('supertest');
const app = require('../../server');

const newUser = require('../data/new-user.json');

test('POST /api/users/signup', async () => {
    const response = await request(app).post('/api/users/signup').send(newUser);

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe(newUser.name);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('password');
});

test('POST /api/users/signin', async () => {
    const response = await request(app).post('/api/users/signin').send(newUser);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('email');
});
