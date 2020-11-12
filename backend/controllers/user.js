const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const db = require('./db')

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
          db.query('SELECT * FROM utilisateurs WHERE email = ?', [req.body.email], function(error, results) {
            if (error) {
              console.log(error);
            }
            const token = jwt.sign(
              { 
                userId: results[0].id,
                prenom: results[0].prenom,
                nom: results[0].nom,
                email: results[0].email,
                privilege: results[0].privilege
              },
              process.env.TOKEN_KEY,
            )
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
  const { email, password } = req.body;
  db.query('SELECT * FROM utilisateurs WHERE email = ?', [email], function(error, results) {
    if (error) {
      console.log(error);
    }
    if (results.length === 0) {
      return res.status(401).json({ message: 'Données invalides' });
    } else {
      const userData = results[0];
      bcrypt.compare(password, userData.mot_de_passe)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ message: 'Données invalides' });
          } else {
            const token = jwt.sign(
              { 
                userId: userData.id,
                prenom: userData.prenom,
                nom: userData.nom,
                email: userData.email,
                privilege: userData.privilege
              },
              process.env.TOKEN_KEY,
            )
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
    if (req.cookies.authcookie === null) {
      console.log("Utilisateur non authentifié");
      return res.status(401).json({ error });
    } else {
      const token = req.cookies.authcookie;
      const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
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

exports.verifConnexion = (req, res, next) => {
  try {
    if (req.cookies.authcookie === null) {
      console.log("Utilisateur non authentifié");
      return res.status(401).json({ error });
    } else {
      const token = req.cookies.authcookie;
      const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
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

exports.passerAdministrateur = (req, res, next) => {
  try {
    if (req.cookies.authcookie === null) {
      console.log("Utilisateur non authentifié");
      return res.status(401).json({ error });
    } else {
      const token = req.cookies.authcookie;
      const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
      if(decodedToken.privilege === 'admin') {
        db.query('UPDATE utilisateurs SET privilege = "admin" WHERE id = ?', [req.body.idUser], function(error, results) {
          if (error) {
            console.log(error);
          }
          return res.status(200).json(results);
        })        
      } else {
        return res.status(401).json({ error });
      }      
    }

  } catch {
    res.status(401).json({
      error: new Error('erreur')
    });
  }
};