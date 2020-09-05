const { User } = require('../models/index.js');

function authorization(req, res, next) {

  User.findOne({ where: { id: req.tokenPayload.id } })
    .then((data) => {
      if (data !== null) {
        if (req.tokenPayload.name === data.name) {
          next();
        }
      } else {
        res.status(401).json({ message: "Not Authorized" })
      }
    })
    .catch((err) => {
      res.status(401).json({ message: "Not Authorized" })
    })
}

module.exports = authorization;