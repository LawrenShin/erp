const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const pino = require('express-pino-logger')();
const app = express();

let publicPath = path.join(__dirname, '..', 'build');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(publicPath));
app.use(pino);

app.get('/*', function (req, res) {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);