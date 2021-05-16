const express = require('express');

const PORT = 5000;

const app = express();
const routes = require('./routes');
const mongoose = require('mongoose');
mongoose
    .connect('mongodb://coffee:coffee@localhost:27017/coffee', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        authSource: 'admin',
    })
    .then(() => console.log(`MongoDB Connected`))
    .catch((err) => console.log(err));

app.use(express.json());

app.use('/api/products', routes.productRouter);
app.use('/api/users', routes.userRouter);

app.get('/', (req, res) => {
    res.send('Index Page');
});

app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message });
});

app.listen(PORT);
console.log(`Running on port ${PORT}`);

module.exports = app;
