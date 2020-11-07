const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const pagesCtrl = require('../controllers/pages');

router.get('/auth-verif', pagesCtrl.verifConnexion);
router.get('/deconnexion', pagesCtrl.deconnexion);
router.post('/article', pagesCtrl.posterArticle);
router.post('/lire-article', pagesCtrl.lireArticle);
router.get('/articles', pagesCtrl.listerArticles);
router.post('/article-utilisateur', pagesCtrl.listerArticlesUtilisateur);
router.post('/commentaire', pagesCtrl.posterCommentaire);
router.post('/recuperer-commentaire', pagesCtrl.recupererCommentaire);
router.post('/commentaire-utilisateur', pagesCtrl.recupererCommentaireUtilisateur);
router.post('/infos-utilisateur', pagesCtrl.infosUtilisateur);
router.post('/supprimer-commentaire', pagesCtrl.supprimerCommentaire);
router.post('/supprimer-article', pagesCtrl.supprimerArticle);
router.post('/signaler-commentaire', pagesCtrl.signalerCommentaire);
router.get('/commentaire-signale', pagesCtrl.recupererCommentaireSignale);
router.post('/passer-admin', pagesCtrl.passerAdministrateur);


module.exports = router;