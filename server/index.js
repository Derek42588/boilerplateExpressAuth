const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const router = require('./router')
const keys = require('./config/keys')

const app = express();

mongoose.connect(keys.mongoURI,  { useNewUrlParser: true,  useUnifiedTopology: true });

//App setup
app.use(morgan('combined'))
app.use(bodyParser.json({type:'*/*'}))
router(app)

//Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app)
//http is a native node library
server.listen(port)
console.log('server listening on:', port)