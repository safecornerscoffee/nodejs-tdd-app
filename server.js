const express = require('express');

const PORT = 5000;

const app = express();
const productRoutes = require('./routes');
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

app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.send('Index Page');
});

app.listen(PORT);
console.log(`Running on port ${PORT}`);
