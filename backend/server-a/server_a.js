const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const OrderRoute = require('./routes/OrderRoute');
const port = 3001;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '100mb' }));

mongoose.connect('mongodb://localhost:27017/SandwichProject', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(port, () => {
      console.log(`Server A listening at http://localhost:${port}`);
    });
}).catch(error => {
    console.log(error);
});

app.use('/api/v1/orderRoute', OrderRoute);
