const express = require('express');
const { getTask } = require('./rabbit-utils/receiveTask.js');
const { rabbitHost, queue1 } = require('./config');
const app = express();
const port = 3002;

app.get('/', (req, res) => {
  res.send('Server B: Hello');
});

getTask(rabbitHost, queue1);

app.listen(port, () => {
  console.log(`Server B listening at http://localhost:${port}`);
});
