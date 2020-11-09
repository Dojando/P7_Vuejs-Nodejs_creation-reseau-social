const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    if (req.cookies.authcookie == null) {
      console.log("Utilisateur non authentifié");
      return res.status(401).json({ error });
    } else {
      const token = req.cookies.authcookie;
      const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
      const userId = decodedToken.userId;
      if (req.body.userId && req.body.userId !== userId) {
        throw 'Invalid user ID';
      } else {
        next();
      }
    }
  } catch {
    res.status(401).json({
      error: new Error('erreur')
    });
  }
};