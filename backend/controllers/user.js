const mysql = require('mysql');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "groupomaniadb"
});


exports.signup = (req, res, next) => {
  db.query('SELECT email FROM utilisateurs where email = ?', [req.body.email], function(error, results) {
    if (error) {
      console.log(error)
    }
    if (results.length > 0) {
      return res.status(400).json({ message: "L'email existe deja" })
    } else {
      bcrypt.hash(req.body.password, 10)
        .then(hash => {
          db.query('INSERT INTO utilisateurs SET ?', {prenom: req.body.prenom, nom: req.body.nom, email: req.body.email, mot_de_passe: hash})
          })
        .then(() => {
          console.log("test 1");
          db.query('SELECT * FROM utilisateurs WHERE email = ?', [req.body.email], function(error, results) {
            if (error) {
              console.log(error);
            }
            console.log(results);
            console.log("test 4");
            const token = jwt.sign(
              { 
                userId: results[0].id,
                prenom: results[0].prenom,
                nom: results[0].nom,
                email: results[0].email,
                privilege: results[0].privilege
              },
              'tUUmO1TPYO8MHOGQwt8QiW8T5IDoSW-wuN8kLEvE1J5-zHAGuNGDgT26sCWdrPKcyy_Q8XTuXjP0wkdw18SFFJ--c1vWoZf1zzjgpJOyffCfUu2N-kCjEpyzpsIC6E-5Oyfuu28r9TT0JMtN_-kblIplyNjNKBxoLcptQ6P4jFk',
            )
            console.log(token);
            res.cookie('authcookie',token,{
              expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
              httpOnly:true});
            res.status(200).json({message : 'Utilisateur connecté'})
          })
        })
        .catch(error => res.status(500).json({ error }))   
    }
  })
};

exports.login = (req, res, next) => {
  console.log(req.body)
  let email = req.body.email;
  let password = req.body.password;
  console.log(req.body);
  db.query('SELECT * FROM utilisateurs WHERE email = ?', [email], function(error, results) {
    if (error) {
      console.log(error);
    }
    if (results.length == 0) {
      return res.status(401).json({ message: 'Données invalides' });
    } else {
      console.log(results);
      bcrypt.compare(password, results[0].mot_de_passe)
        .then(valid => {
          if (valid == false) {
            return res.status(401).json({ message: 'Données invalides' });
          } else {
            const token = jwt.sign(
              { 
                userId: results[0].id,
                prenom: results[0].prenom,
                nom: results[0].nom,
                email: results[0].email,
                privilege: results[0].privilege
              },
              'tUUmO1TPYO8MHOGQwt8QiW8T5IDoSW-wuN8kLEvE1J5-zHAGuNGDgT26sCWdrPKcyy_Q8XTuXjP0wkdw18SFFJ--c1vWoZf1zzjgpJOyffCfUu2N-kCjEpyzpsIC6E-5Oyfuu28r9TT0JMtN_-kblIplyNjNKBxoLcptQ6P4jFk',
            )
            console.log(token);
            res.cookie('authcookie',token,{
              expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
              httpOnly:true});
            res.status(200).json({message : 'Utilisateur connecté'});
          }
        })
        .catch(error => res.status(500).json({ error }));
    }
  })   
};

exports.suppression = (req, res, next) => {
  try {
    
    if (req.cookies.authcookie == null) {
      console.log("Utilisateur non authentifié");
      return res.status(401).json({ error });
    } else {
      const token = req.cookies.authcookie;
      const decodedToken = jwt.verify(token, 'tUUmO1TPYO8MHOGQwt8QiW8T5IDoSW-wuN8kLEvE1J5-zHAGuNGDgT26sCWdrPKcyy_Q8XTuXjP0wkdw18SFFJ--c1vWoZf1zzjgpJOyffCfUu2N-kCjEpyzpsIC6E-5Oyfuu28r9TT0JMtN_-kblIplyNjNKBxoLcptQ6P4jFk');
      console.log(decodedToken);
      db.query('DELETE FROM utilisateurs WHERE id = ?', [decodedToken.userId], function(error, results) {
        if (error) {
          console.log(error);
        }
        return res.status(200).json(results);
      })
    }
  } catch {
    res.status(401).json({
      error: new Error('erreur')
    });
  }
};