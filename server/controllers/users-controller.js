const { User } = require('../models/index.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController {
  static registerPostHandler(req, res, next) {
    User.create({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name
    })
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        next(err);
      })
  }

  static loginPostHandler(req, res, next) {
    User.findOne({ where: { email: req.body.email } })
      .then((data) => {
        if (data) {
          if (bcrypt.compareSync(req.body.password, data.password)) {
            const payload = {
              id: data.id,
              email: data.email
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
            res.status(200).json({ token: token, email: data.email });
          } else {
            next("InvalidLogin");
          }
        } else {
          next("InvalidLogin");
        }
      })
      .catch((err) => {
        next(err);
      })
  }

  static googleSignInHandler(req, res, next) {
    let payload;
    googleClient.verifyIdToken({
      idToken: "",
      audience: process.env.GOOGLE_CLIENT_ID
    })
      .then((ticket) => {
        payload = ticket.getPayload();
        return User.findOne({ where: { email: payload.email } })
      })
      .then((data) => {
        if (data === null) {
          const salt = bcrypt.genSaltSync(5);
          const hash = bcrypt.hashSync(payload.name, salt);
          return User.create({
            name: payload.name,
            email: payload.email,
            password: hash
          })
        } else {
          return data;
        }
      })
      .then((data) => {
        let jwtPayload = {
          id: data.id,
          email: data.email,
          name: data.name
        }
        const token = jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY);
        res.status(200).json({ token: token, email: data.email });
      })
      .catch((err) => {
        next(err);
      })
  }
}

module.exports = UserController;