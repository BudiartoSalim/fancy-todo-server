const { User, Todo } = require('../models/index.js');
//const sendWhatsappMessagesTo = require('../API/twilio-whatsapp.js');

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
    let todoTitle;
    Todo.create({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      UserId: req.tokenPayload.id
    })
      .then(data => {
        todoTitle = data.title;
        return User.findOne({ where: { UserId: data.UserId } });
      })
      .then((data) => {
        if (data.whatsapp) {
          //        sendWhatsappMessagesTo(data.whatsapp, `You got a new To-do: ${todoTitle}`)
          //commented because it causes error if the credentials is not filled
        }
        res.status(201).json(data);
      })
      .catch((err) => {
        next(err);
      })
  }

  static todosIdGetHandler(req, res, next) {
    Todo.findOne({ where: { id: req.params.id } })
      .then((data) => {
        if (data === null) {
          next("Not found");
        } else {
          res.status(200).json(data);
        }
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
        if (data === 0) {
          next("Not found");
        } else {
          res.status(200).json({ message: "Task deleted successfully!" });
        }
      })
      .catch((err) => {
        next(err);
      })
  }

}

module.exports = TodosController;