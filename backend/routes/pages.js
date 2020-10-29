const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const pagesCtrl = require('../controllers/pages');

router.get('/auth-verif', pagesCtrl.verifConnexion);
router.get('/deconnexion', pagesCtrl.deconnexion);
router.post('/article', pagesCtrl.posterArticle);
router.post('/lire-article', pagesCtrl.lireArticle);
router.get('/articles', pagesCtrl.listerArticles);

module.exports = router;