const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const pagesCtrl = require('../controllers/pages');

router.get('/auth-verif', pagesCtrl.verifConnexion);
// router.post('/login', userCtrl.login);

module.exports = router;