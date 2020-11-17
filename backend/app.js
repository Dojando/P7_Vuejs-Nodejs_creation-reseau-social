const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require("helmet");
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const userRoutes = require('./routes/user');
const pagesRoutes = require('./routes/pages');

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

db.connect(function(err) {
  if (err) {
    throw err;
  } else {
    console.log("Connexion à MySQL réussie !");
  }
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, USE, PATCH, OPTIONS');
  next();
});

app.use(cors({
  // adresse du frontend
  origin: 'http://localhost:8080',
  credentials: true,
}))

app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/auth', userRoutes);
app.use('/api/pages', pagesRoutes);

module.exports = app;