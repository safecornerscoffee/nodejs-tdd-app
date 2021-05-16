const userModel = require('../models/User');
const mongoose = require('mongoose');

const signUp = async (req, res, next) => {
    try {
        let newUser = req.body;

        newUser.id = new mongoose.Types.ObjectId();

        if (newUser.email === '' || newUser.password === '') {
            res.status(400).json({ message: 'invalid email or password' });
            return;
        }

        let createdUser = await userModel.create(newUser);

        createdUser.id = createdUser.id.toString();
        res.status(201).json(createdUser);
    } catch (error) {
        next(error);
    }
};

const signIn = async () => {};
module.exports = { signUp, signIn };
