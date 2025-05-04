const Todo = require('../models/Todo');

// ✅ Return data directly for use in API routes
exports.getAllTodos = async () => {
  try {
    const todos = await Todo.findAll();
    return todos;
  } catch (err) {
    console.error('Database error:', err);
    throw new Error('Database error');
  }
};

// ✅ Keep using (req, res) for handlers that write directly
exports.createTodo = async (req, res) => {
  try {
    const { task } = req.body;

    if (!task) {
      return res.status(400).json({ error: 'Task is required' });
    }

    const todo = await Todo.create(task);
    return res.status(201).json(todo);
  } catch (err) {
    console.error('Error creating todo:', err);
    return res.status(500).json({ error: 'Failed to create todo' });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }

    await Todo.delete(id);
    return res.status(200).json({ message: 'Deleted' });
  } catch (err) {
    console.error('Error deleting todo:', err);
    return res.status(500).json({ error: 'Failed to delete todo' });
  }
};
