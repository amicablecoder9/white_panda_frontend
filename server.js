const express = require('express');
const serveStatic = require('serve-static');
const cors = require('cors');
const path = require('path');


const port = process.env.PORT || 5000

const app = express()

app.use(cors());
app.use(express.static('dist/spa'));
app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, 'dist/spa', 'index.html'));
});
//app.use(serveStatic(__dirname + '/dist/spa'))

const server = app.listen(port, () => {
  console.log('Listening on port ' + port)
});
