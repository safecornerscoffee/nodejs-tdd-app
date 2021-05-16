const userModel = require('../models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const defaultCost = 10;

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

const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

const signIn = async () => {};
module.exports = { signUp, signIn };
