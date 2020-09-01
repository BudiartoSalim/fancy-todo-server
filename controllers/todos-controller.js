const { User, Todo } = require('../models/index.js');

class TodosController {
    static todosGetHandler(req, res, next) {
        Todo.findAll({})
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                next(err);
            })
    }

    static todosPostHandler(req, res, next) {
        Todo.create({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.body.UserId //hardcoded for now, will be refactored with userId from session later
        })
            .then((data) => {
                res.status(201).json(data);
            })
            .catch((err) => {
                next(err);
            })
    }

    static todosIdGetHandler(req, res, next) {
        Todo.findOne({ where: { id: req.params.id } })
            .then((data) => {
                if (!data) {
                    next("Not found");
                }
                res.status(200).json(data);
            })
            .catch((err) => {
                next(err);
            })
    }

    static todosIdPutHandler(req, res, next) {
        Todo.findOne({ where: { id: req.params.id } })
            .then((data) => {
                return Todo.update({
                    title: req.body.title,
                    description: req.body.description,
                    status: req.body.status,
                    due_date: req.body.due_date
                }, { where: { id: req.params.id } })
            })
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                next(err)
            })
    }

    static todosIdDeleteHandler(req, res, next) {
        Todo.destroy({ where: { id: req.params.id } })
            .then((data) => {
                if (!data) {
                    next("Not found");
                }
                res.status(200).json(data);
            })
            .catch((err) => {
                next(err);
            })
    }

}

module.exports = TodosController;