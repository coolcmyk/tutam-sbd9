const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// GET all todos
router.get('/', todoController.getAllTodos);

// POST a new todo
router.post('/', todoController.createTodo);

// DELETE a todo
router.delete('/', todoController.deleteTodo);

module.exports = router;