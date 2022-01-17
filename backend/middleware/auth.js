const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    if (req.headers.authorization) {
   // On extrait le token du header. On utilise split pour récupérer tout après l'espace dans le header.
    const token = req.headers.authorization.split(' ')[1];
    // On utilise la fonction verify pour décoder le token
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    userId = decodedToken.userId;
    // On défini l'userId dans req. pour pouvoir l'utiliser ailleurs
    req.userId = userId;
    } 
    next();
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  } 
};