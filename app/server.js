require('dotenv').config(); // read .env files
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + 'index.html');
});

app.get('/cipher', (req, res) => {
  res.sendFile(__dirname + '/cipher.html');
});

// Listen for HTTP requests on port 3000
app.listen(port, () => {
  console.log('listening on %d', port);
});