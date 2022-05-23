const express = require('express');
const path = require('path');
const app = express()
const port = 5500;

const options = {
  root: path.join(__dirname, ''),
  dotfiles: 'deny',
  headers: {
    'x-timestamp': Date.now(),
    'x-sent': true
  },
};

app.get('/', (req, res) => {
  res.sendFile('3dview.html', options);
});

app.get('/OrbitControls.js', (req, res) => {
  res.sendFile('OrbitControls.js', options);
});

app.get('/:fileName', (req, res) => {
  res.sendFile(`/assets/${req.params.fileName}`, options);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});