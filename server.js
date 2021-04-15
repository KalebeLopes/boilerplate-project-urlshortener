require('dotenv').config();
mongoose = require('mongoose');
const routes = require('./routes')
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const Database = require('./database.js')
const url = 'mongodb+srv://kalebe:kalebe@cluster0.vwe4q.mongodb.net/url?retryWrites=true&w=majority'


// Basic Configuration
const database = new Database()
database.databaseConection(url)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(routes)
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});







