const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const OrderRoute = require('./routes/orderRoute');
const SandwichRoute = require('./routes/sandwichRoute');
const { specs, swaggerUi } = require('./swagger/swagger');
const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '100mb' })); // Parsing JSON request bodies with size limit

// Connect to MongoDB
mongoose.connect('mongodb://mongo:27017/sandwichProject', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection; // Storing the database connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api/v1', OrderRoute);
app.use('/api/v1/sandwichRoute', SandwichRoute);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
