const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/suppression', auth, userCtrl.suppression);
router.get('/auth-verif', userCtrl.verifConnexion);
router.get('/deconnexion', auth, userCtrl.deconnexion);
router.post('/passer-admin', auth, userCtrl.passerAdministrateur);

module.exports = router;