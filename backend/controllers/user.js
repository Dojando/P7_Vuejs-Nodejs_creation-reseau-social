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
  console.log(req.body);
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
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
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
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    } else {
      console.log(results);
      bcrypt.compare(password, results[0].mot_de_passe)
        .then(valid => {
          console.log(valid);
          if (valid == false) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
          } else {
            const token = jwt.sign(
              { 
                userId: results[0].id,
              },
              'tUUmO1TPYO8MHOGQwt8QiW8T5IDoSW-wuN8kLEvE1J5-zHAGuNGDgT26sCWdrPKcyy_Q8XTuXjP0wkdw18SFFJ--c1vWoZf1zzjgpJOyffCfUu2N-kCjEpyzpsIC6E-5Oyfuu28r9TT0JMtN_-kblIplyNjNKBxoLcptQ6P4jFk',
            )
            res.cookie('authcookie',token,{maxAge:2992592000,httpOnly:true});
            res.status(201).json({ message: 'connecté' });
          }
        })
        .catch(error => res.status(500).json({ error }));
    }
  })   
};