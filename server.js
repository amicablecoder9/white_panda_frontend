const express = require('express');
const serveStatic = require('serve-static');
const cors = require('cors');


const port = process.env.PORT || 5000

const app = express()

app.use(cors());
app.use(serveStatic(__dirname + '/dist/spa'))

const server = app.listen(port, () => {
  console.log('Listening on port ' + port)
});
