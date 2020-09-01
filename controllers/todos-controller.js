const {User, Todo} = require ('../models/index.js');

class TodosController{
    static todosGetHandler(req, res){
        Todo.findAll({})
        .then((data)=>{
            res.status(200).json(data);
        })
        .catch((err)=>{
            res.status(500).json({errors: ['Internal Server Error']})
        })
    }

    static todosPostHandler(req, res){
        Todo.create({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.body.UserId //hardcoded for now, will be refactored with userId from session later
        })
        .then((data)=>{
            res.status(201).json(data);
        })
        .catch((err)=>{
            if (err.name === 'SequelizeValidationError'){
                res.status(400).json({errors: err.errors})
            } else {
                res.status(500).json({errors: ['Internal Server Error']})
            }
        })
    }

    static todosIdGetHandler(req, res){
        Todo.findOne({where: {id: req.params.id}})
        .then((data)=>{
            res.status(200).json(data);
        })
        .catch((err)=>{
            res.status(404).json(err);
        })
    }

    static todosIdPutHandler(req, res){
        Todo.findOne({where:{id: req.params.id}})
        .then((data)=>{
        return Todo.update({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }, {where: {id: req.params.id}})
        })
        .then((data)=>{
            res.status(200).json(data);
        })
        .catch((err)=>{
            if (err.name === 'SequelizeValidationError'){
                res.status(400).json(err);
            } else if (err.name === 'SequelizeConnectionError'){
                res.status(404).json(err);
            } else {
                res.status(500).json(['Internal Server Error']);
            }
        })
    }

    static todosIdDeleteHandler(req,res){
        Todo.findOne({where:{id: req.params.id}})
        .then((data)=>{
            return Todo.destroy({where:{id: req.params.id}})
        })
        .then((data)=>{
            res.status(200).json(data);
        })
        .catch((err)=>{
            if(err === "something"){
                res.status(404).json(err);
            } else {
                res.status(500).json({errors: ['Internal Server Error']})
            }
        })
    }

}

module.exports = TodosController;