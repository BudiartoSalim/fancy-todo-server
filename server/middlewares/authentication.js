const jwt = require('jsonwebtoken');

function authentication(req, res, next) {
  try {
    if (!req.headers.token) { //if token not exists
      res.status(401).json({ message: "Auth fail" });
    } else {
      req.tokenPayload = jwt.verify(req.headers.token, process.env.JWT_SECRET_KEY)
      next();
    }
  } catch (err) {
    res.status(401).json({ message: "Auth fail" });
  }

}

module.exports = authentication;