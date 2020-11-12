const jwt = require('jsonwebtoken');
const db = require('./db');

exports.posterArticle = (req, res, next) => {
  try {
    if (req.cookies.authcookie === null) {
      console.log("Utilisateur non authentifié");
      return res.status(401).json({ error });
    } else {
      const token = req.cookies.authcookie;
      const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
      db.query('INSERT INTO articles SET ?', {titre: req.body.titre, contenu: req.body.contenu, id_utilisateur: decodedToken.userId})
      return res.status(200).json({ message: "Article publié" });
    }
  } catch {
    res.status(401).json({
      error: new Error('erreur')
    });
  }
};

exports.lireArticle = (req, res, next) => {
  try {
    db.query('SELECT articles.*, utilisateurs.prenom, utilisateurs.nom FROM articles LEFT OUTER JOIN utilisateurs ON articles.id_utilisateur = utilisateurs.id WHERE articles.id = ?', [req.body.articleId], function(error, results) {
      if (error) {
        console.log(error);
      }
      return res.status(200).json(results);
    })
    } catch {
    res.status(401).json({
      error: new Error('erreur')
    });
  }
};

exports.listerArticles = (req, res, next) => {
  try {
    db.query('SELECT articles.id, articles.titre, articles.date_creation, articles.id_utilisateur, utilisateurs.prenom, utilisateurs.nom FROM articles LEFT OUTER JOIN utilisateurs ON articles.id_utilisateur = utilisateurs.id ORDER BY articles.date_creation DESC', function(error, results) {
      if (error) {
        console.log(error);
      }
      return res.status(200).json(results);
    })
  } catch {
    res.status(401).json({
      error: new Error('erreur')
    });
  }
};

exports.listerArticlesUtilisateur = (req, res, next) => {
  try {
    db.query('SELECT articles.id, articles.titre, articles.date_creation, articles.id_utilisateur, utilisateurs.prenom, utilisateurs.nom FROM articles LEFT OUTER JOIN utilisateurs ON articles.id_utilisateur = utilisateurs.id WHERE articles.id_utilisateur = ? ORDER BY articles.date_creation DESC', [req.body.idUser], function(error, results) {
      if (error) {
        console.log(error);
      }
      return res.status(200).json(results);
    })
  } catch {
    res.status(401).json({
      error: new Error('erreur')
    });
  }
};

exports.posterCommentaire = (req, res, next) => {
  try {
    if (req.cookies.authcookie === null) {
      console.log("Utilisateur non authentifié");
      return res.status(401).json({ error });
    } else {
      const token = req.cookies.authcookie;
      const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
      db.query('INSERT INTO commentaires SET ?', {contenu: req.body.contenu, id_utilisateur: decodedToken.userId, id_article: req.body.articleId, id_parent: req.body.parentId})
      return res.status(200).json({ message: "Commentaire publié" });
    }
  } catch {
    res.status(401).json({
      error: new Error('erreur')
    });
  }
};

exports.recupererCommentaire = (req, res, next) => {
  try {
    db.query('SELECT commentaires.*, utilisateurs.prenom, utilisateurs.nom FROM commentaires LEFT OUTER JOIN utilisateurs ON commentaires.id_utilisateur = utilisateurs.id WHERE commentaires.id_article = ? ORDER BY commentaires.date_creation ASC', [req.body.articleId], function(error, results) {
      if (error) {
        console.log(error);
      }
      return res.status(200).json(results);
    })
  } catch {
    res.status(401).json({
      error: new Error('erreur')
    });
  }
};

exports.recupererCommentaireUtilisateur = (req, res, next) => {
  try {
    db.query('SELECT commentaires.*, utilisateurs.prenom, utilisateurs.nom FROM commentaires LEFT OUTER JOIN utilisateurs ON commentaires.id_utilisateur = utilisateurs.id WHERE commentaires.id_utilisateur = ? ORDER BY commentaires.date_creation ASC', [req.body.idUser], function(error, results) {
      if (error) {
        console.log(error);
      }
      return res.status(200).json(results);
    })
  } catch {
    res.status(401).json({
      error: new Error('erreur')
    });
  }
};

exports.infosUtilisateur = (req, res, next) => {
  try {
    db.query('SELECT prenom, nom, privilege, id FROM utilisateurs WHERE id = ?', [req.body.idUser], function(error, results) {
      if (error) {
        console.log(error);
      }
      return res.status(200).json(results);
    })
  } catch {
    res.status(401).json({
      error: new Error('erreur')
    });
  }
};

exports.supprimerCommentaire = (req, res, next) => {
  try {
    if (req.cookies.authcookie === null) {
      console.log("Utilisateur non authentifié");
      return res.status(401).json({ error });
    } else {
      const token = req.cookies.authcookie;
      const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
      if(decodedToken.userId === req.body.auteurId || decodedToken.privilege === 'admin') {
        if (req.body.parentId === null) {
          db.query('DELETE FROM commentaires WHERE id = ? OR id_parent = ?', [req.body.commentaireId, req.body.commentaireId], function(error, results) {
            if (error) {
              console.log(error);
            }
            return res.status(200).json({ message: "Commentaire supprimé" });
          })
        } else if (req.body.parentId != null) {
          db.query('DELETE FROM commentaires WHERE id = ?', [req.body.commentaireId], function(error, results) {
            if (error) {
              console.log(error);
            }
            return res.status(200).json({ message: "Commentaire supprimé" });
          })
        }
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

exports.supprimerArticle = (req, res, next) => {
  try {
    if (req.cookies.authcookie === null) {
      console.log("Utilisateur non authentifié");
      return res.status(401).json({ error });
    } else {
      const token = req.cookies.authcookie;
      const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
      if(decodedToken.userId === req.body.auteurId || decodedToken.privilege === 'admin') {
        db.query('DELETE FROM articles WHERE id = ?', [req.body.articleId], function(error, results) {
          if (error) {
            console.log(error);
          }
          db.query('DELETE FROM commentaires WHERE id_article = ?', [req.body.articleId], function(error, results) {
            if (error) {
              console.log(error);
            }
            return res.status(200).json({ message: "Article supprimé" });
          })
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

exports.signalerCommentaire = (req, res, next) => {
  try {
    db.query('UPDATE commentaires SET signaler = true WHERE id = ?', [req.body.comId], function(error, results) {
      if (error) {
        console.log(error);
      }
      return res.status(200).json(results);
    })
  } catch {
    res.status(401).json({
      error: new Error('erreur')
    });
  }
};

exports.recupererCommentaireSignale = (req, res, next) => {
  try {
    db.query('SELECT commentaires.*, utilisateurs.prenom, utilisateurs.nom FROM commentaires LEFT OUTER JOIN utilisateurs ON commentaires.id_utilisateur = utilisateurs.id WHERE commentaires.signaler = true ORDER BY commentaires.date_creation ASC', function(error, results) {
      if (error) {
        console.log(error);
      }
      return res.status(200).json(results);
    })
  } catch {
    res.status(401).json({
      error: new Error('erreur')
    });
  }
};

