const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000

app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

let routes = require('./api/routes/routes') 
routes(app)

app.listen(port)

console.log('RESTful API server started on: ' + port)