const express = require('express');
const consign = require('consign');
let app = express();

app.config = require('./config/config.js')
app.models = require('./models')

consign({verbose: false})
  .include('auth.js')
  .then('controller')
  .then('libs/middlewares.js')
  .then('routes')
  .then('libs/boot.js')
  .into(app)


module.exports = app
