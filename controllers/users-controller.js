const { User } = require('../models/index.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
                        res.status(200).json({ token: token });
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
}

module.exports = UserController;