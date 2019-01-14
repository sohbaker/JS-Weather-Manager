const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

// /dist points to where main.js file is
app.use(express.static(__dirname + '/dist'));

// /dist/index points to where index.html is
app.get('*',  (req, res) => {
  res.sendFile(path.resolve(__dirname, './index.html'));
});

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
};

app.listen(port);
