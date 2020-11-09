const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const pagesCtrl = require('../controllers/pages');

router.get('/auth-verif', pagesCtrl.verifConnexion);
router.get('/deconnexion', auth, pagesCtrl.deconnexion);
router.post('/article', auth, pagesCtrl.posterArticle);
router.post('/lire-article', auth, pagesCtrl.lireArticle);
router.get('/articles', auth, pagesCtrl.listerArticles);
router.post('/article-utilisateur', auth, pagesCtrl.listerArticlesUtilisateur);
router.post('/commentaire', auth, pagesCtrl.posterCommentaire);
router.post('/recuperer-commentaire', auth, pagesCtrl.recupererCommentaire);
router.post('/commentaire-utilisateur', auth, pagesCtrl.recupererCommentaireUtilisateur);
router.post('/infos-utilisateur', auth, pagesCtrl.infosUtilisateur);
router.post('/supprimer-commentaire', auth, pagesCtrl.supprimerCommentaire);
router.post('/supprimer-article', auth, pagesCtrl.supprimerArticle);
router.post('/signaler-commentaire', auth, pagesCtrl.signalerCommentaire);
router.get('/commentaire-signale', auth, pagesCtrl.recupererCommentaireSignale);
router.post('/passer-admin', auth, pagesCtrl.passerAdministrateur);


module.exports = router;