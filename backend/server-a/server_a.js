const express = require("express");
const mongoose = require('mongoose');
const { getTask } = require('./rabbit-utils/receiveTask.js');
const { rabbitHost, queue2 } = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const OrderRoute = require('./routes/orderRoute');
const SandwichRoute = require('./routes/sandwichRoute');
const UserRoute = require('./routes/userRoute');
const { specs, swaggerUi } = require('./swagger/swagger');
const socketIo = require('socket.io');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '100mb' })); // Parsing JSON request bodies with size limit

app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000', // specify the origin
  credentials: true, // allowing credentials
}));
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
app.use('/api/v1', SandwichRoute);
app.use('/api/v1/user', UserRoute);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Create a socket.io server with CORS options
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

getTask(rabbitHost, queue2, io);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
