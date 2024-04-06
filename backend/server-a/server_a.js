const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Server A: Hello');
});

app.listen(port, () => {
  console.log(`Server A listening at http://localhost:${port}`);
});
