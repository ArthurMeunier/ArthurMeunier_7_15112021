const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // On extrait le token du header. On utilise split pour récupérer tout après l'espace dans le header.
    const token = req.headers.authorization.split(' ')[1];
    // On utilise la fonction verify pour décoder le token
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    console.log(decodedToken);
    userId = decodedToken.userId;
    // console.log(userId);
    // if (req.body.userId && req.body.userId !== userId) {
    //   throw 'Invalid user ID';
    // } else {
      next();
    // }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  } 
  next();
};