const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

const userRoutes = require('./routes/user');

let db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "groupomaniadb"
});

db.connect(function(err) {
  if (err) {
    throw err;
  } else {
    console.log("Connexion à MySQL réussie !");
  }
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('/api/auth', userRoutes);

module.exports = app;