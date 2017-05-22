const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;
mongoose.Promise = global.Promise;

var mongoURL = process.env.MONGODB_URI || 'mongodb://localhost:28028/Final-Project';
mongoose.connect(mongoURL);

app.use(express.static(path.resolve(__dirname, '../final-project-client/build')));
app.use(bodyParser.urlencoded({ extended: false}));

require('./authentify.js')(app);


// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../final-project-client/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Howdy ho from port ${PORT}`);
});
