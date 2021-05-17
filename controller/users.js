const userModel = require('../models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const defaultCost = 10;

const jwt = require('jsonwebtoken');
const jwtSecret = 'super-secret-jwt-key';

const signUp = async (req, res, next) => {
    try {
        const newUser = req.body;

        newUser.id = new mongoose.Types.ObjectId();

        if (newUser.email === '' || newUser.password === '') {
            res.status(400).json({ message: 'invalid email or password' });
            return;
        }

        newUser.password = await hashAndSaltPassword(newUser.password);

        let createdUser = await userModel.create(newUser);
        createdUser.id = createdUser.id.toString();

        res.status(201).json(createdUser);
    } catch (error) {
        next(error);
    }
};

const hashAndSaltPassword = async (password) => {
    return await bcrypt.hash(password, defaultCost);
};

const signIn = async (req, res, next) => {
    try {
        let email = req.body.email;
        let password = req.body.password;

        let user = await userModel.findOne({ email: email });

        let match = await comparePassword(password, user.password);
        if (match) {
            let payload = {
                id: user.email,
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 72,
            };

            user.token = await jwt.sign(payload, jwtSecret, {
                algorithm: 'HS256',
            });
            res.status(200).json(user);
        } else {
            res.status(401).json({ message: 'invalid email or password' });
        }
    } catch (error) {
        next(error);
    }
};

const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

module.exports = { signUp, signIn };
