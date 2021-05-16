const userModel = require('../../models/User');
const userController = require('../../controller/users');
const httpMocks = require('node-mocks-http');

let req, res, next;
beforeEach(() => {
    userModel.create = jest.fn();
    userModel.findOne = jest.fn();
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

let newUser = {
    email: 'coffee@safecornerscoffe.com',
    password: 'super-secret',
};

let invalidEmailUser = {
    email: '',
    password: 'super-secret',
};

let invalidPasswordUser = {
    email: 'coffee@safecornerscoffe.com',
    password: '',
};

describe('UserController.signUp function', () => {
    beforeEach(() => {
        req.body = JSON.parse(JSON.stringify(newUser));
    });

    it('should be a function', () => {
        expect(typeof userController.signUp).toBe('function');
    });

    it('should have call User.create', async () => {
        await userController.signUp(req, res, next);
        expect(userModel.create).toBeCalled();
    });

    it('should return 201 status code and json in response when user created', async () => {
        userModel.create.mockReturnValue(newUser);
        await userController.signUp(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._getJSONData()).toStrictEqual(newUser);
        expect(res._isEndCalled).toBeTruthy();
    });

    it('should return 400 status code for invalid email or password', async () => {
        req.body = invalidEmailUser;
        const errorMessage = { message: 'invalid email or password' };
        await userController.signUp(req, res, next);
        expect(res.statusCode).toBe(400);
        expect(res._getJSONData()).toStrictEqual(errorMessage);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it('should return 400 status code for invalid password', async () => {
        req.body = invalidPasswordUser;
        const errorMessage = { message: 'invalid email or password' };
        await userController.signUp(req, res, next);
        expect(res.statusCode).toBe(400);
        expect(res._getJSONData()).toStrictEqual(errorMessage);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it('should hash password using bcrypt', async () => {
        let hashedPassword;
        userModel.create = jest.fn((x) => {
            hashedPassword = x.password;
            return x;
        });
        await userController.signUp(req, res, next);
        expect(res._getJSONData().password).toBe(hashedPassword);
    });

    // it('should handle internal error', async () => {
    //     const errorMessage = { message: 'internal error' };
    //     const rejectedPromise = Promise.reject(errorMessage);
    //     userModel.create.mockReturnValue(rejectedPromise);
    //     await userController.signUp(req, res, next);
    //     expect(next).toHaveBeenCalledWith(errorMessage);
    // });
});

describe('UserController.signIn function', () => {
    beforeEach(() => {
        req.body = JSON.parse(JSON.stringify(newUser));
    });
    it('should be a function', () => {
        expect(typeof userController.signIn).toBe('function');
    });

    it('should call userModel.find', async () => {
        await userController.signIn(req, res, next);
        expect(userModel.findOne).toBeCalledWith({ email: req.body.email });
    });

    it('should return 200 status code for valid credentials', async () => {
        let expectedResponse = {
            _id: '60a14fb8afda8919590e2653',
            email: 'coffee@safecornerscoffe.com',
            password:
                '$2b$10$gCn7rKW7TWN7lN9ez1KQJeg4qWcLpNXFve/kB9JpAn3q12DWH5VM6',
            id: '60a14fb8afda8919590e2652',
            __v: 0,
        };
        userModel.findOne.mockReturnValue(expectedResponse);
        await userController.signIn(req, res, next);
        expect(res.statusCode).toBe(200);
    });

    it('should return 401 when invalid credentials', async () => {
        req.body.password = 'wrong-password';
        let expectedResponse = {
            _id: '60a14fb8afda8919590e2653',
            email: 'coffee@safecornerscoffe.com',
            password:
                '$2b$10$gCn7rKW7TWN7lN9ez1KQJeg4qWcLpNXFve/kB9JpAn3q12DWH5VM6',
            id: '60a14fb8afda8919590e2652',
            __v: 0,
        };
        userModel.findOne.mockReturnValue(expectedResponse);
        await userController.signIn(req, res, next);
        expect(res.statusCode).toBe(401);
    });

    it('should handle errors', async () => {
        const errorMessage = { message: 'internal error' };
        const rejectedPromise = Promise.reject(errorMessage);
        userModel.findOne.mockReturnValue(rejectedPromise);
        await userController.signIn(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
});
