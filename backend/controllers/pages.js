const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const { response } = require('express');
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "groupomaniadb"
});

exports.verifConnexion = (req, res, next) => {
  try {
    if (req.cookies.authcookie == null) {
      console.log("Utilisateur non authentifié");
      return res.status(401).json({ error });
    } else {
      const token = req.cookies.authcookie;
      const decodedToken = jwt.verify(token, 'tUUmO1TPYO8MHOGQwt8QiW8T5IDoSW-wuN8kLEvE1J5-zHAGuNGDgT26sCWdrPKcyy_Q8XTuXjP0wkdw18SFFJ--c1vWoZf1zzjgpJOyffCfUu2N-kCjEpyzpsIC6E-5Oyfuu28r9TT0JMtN_-kblIplyNjNKBxoLcptQ6P4jFk');
      console.log(decodedToken);
      return res.status(200).json(decodedToken);
    }
  } catch {
    res.status(401).json({
      error: new Error('erreur')
    });
  }
};

exports.deconnexion = (req, res, next) => {
  res.clearCookie('authcookie');
  return res.status(200).json({ message: "Utilisateur déconnecté" });
};

exports.posterArticle = (req, res, next) => {
  try {
    if (req.cookies.authcookie == null) {
      console.log("Utilisateur non authentifié");
      return res.status(401).json({ error });
    } else {
      const token = req.cookies.authcookie;
      const decodedToken = jwt.verify(token, 'tUUmO1TPYO8MHOGQwt8QiW8T5IDoSW-wuN8kLEvE1J5-zHAGuNGDgT26sCWdrPKcyy_Q8XTuXjP0wkdw18SFFJ--c1vWoZf1zzjgpJOyffCfUu2N-kCjEpyzpsIC6E-5Oyfuu28r9TT0JMtN_-kblIplyNjNKBxoLcptQ6P4jFk');
      db.query('INSERT INTO articles SET ?', {titre: req.body.titre, contenu: req.body.contenu, id_utilisateur: decodedToken.userId})
      return res.status(200).json({ message: "Article publié" });
    }
  } catch {
    res.status(401).json({
      error: new Error('erreur')
    });
  }
};

exports.listerArticles = (req, res, next) => {
  try {
    db.query('SELECT articles.id, articles.titre, articles.date_creation, articles.id_utilisateur, utilisateurs.prenom, utilisateurs.nom FROM articles, utilisateurs WHERE articles.id_utilisateur = utilisateurs.id ORDER BY articles.date_creation ASC', function(error, results) {
      if (error) {
        console.log(error);
      }
      console.log(results);
      return res.status(200).json(results);
    })
  } catch {
    res.status(401).json({
      error: new Error('erreur')
    });
  }
};