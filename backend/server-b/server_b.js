const express = require('express');
const { getTask } = require('./rabbit-utils/receiveTask.js')
const app = express();
const port = 3002;

app.get('/', (req, res) => {
  res.send('Server B: Hello');
});

getTask('rapid-runner-rabbit', 'received-orders');

app.listen(port, () => {
  console.log(`Server B listening at http://localhost:${port}`);
});
