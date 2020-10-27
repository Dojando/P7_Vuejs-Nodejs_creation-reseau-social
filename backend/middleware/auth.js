const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    if (req.cookies.authcookie == null) {
      console.log("Utilisateur non authentifié");
      return res.status(401).json({ error });
    } else {
      const token = req.cookies.authcookie;
      const decodedToken = jwt.verify(token, 'tUUmO1TPYO8MHOGQwt8QiW8T5IDoSW-wuN8kLEvE1J5-zHAGuNGDgT26sCWdrPKcyy_Q8XTuXjP0wkdw18SFFJ--c1vWoZf1zzjgpJOyffCfUu2N-kCjEpyzpsIC6E-5Oyfuu28r9TT0JMtN_-kblIplyNjNKBxoLcptQ6P4jFk');
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