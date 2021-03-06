const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', (_req, res) => {
  return res.send('pong');
});

app.get('/*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port);
