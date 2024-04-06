const express = require('express');
const app = express();
const port = 3002;

app.get('/', (req, res) => {
  res.send('Server B: Hello');
});

app.listen(port, () => {
  console.log(`Server B listening at http://localhost:${port}`);
});
