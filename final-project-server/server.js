const express = require('express');
const path = require('path');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');



const app = express();
const PORT = process.env.PORT || 5000;

require('./authentify.js')(app);

app.use(bodyParser.urlencoded({ extended: false }));
mongoose.Promise = global.Promise;
var mongoURL = process.env.MONGODB_URI || 'mongodb://localhost:28028/Final-Project';
mongoose.connect(mongoURL);

app.use(express.static(path.resolve(__dirname, '../final-project-client/build')));


app.listen(PORT, function() {
  console.log('Howdey ho from port ', PORT)
})
