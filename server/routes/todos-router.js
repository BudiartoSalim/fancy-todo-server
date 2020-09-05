const express = require('express');
const router = express.Router();
const TodosController = require('../controllers/todos-controller.js');
const authentication = require('../middlewares/authentication.js');
const authorization = require('../middlewares/authorization.js');

router.use(authentication);
router.use(authorization);
router.post('/', TodosController.todosPostHandler);
router.get('/', TodosController.todosGetHandler);
router.get('/:id', TodosController.todosIdGetHandler);
router.put('/:id', TodosController.todosIdPutHandler);
router.delete('/:id', TodosController.todosIdDeleteHandler);

module.exports = router;