const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || '', {});

const TodoSchema = new mongoose.Schema({ task: String });
const Todo = mongoose.models.Todo || mongoose.model('Todo', TodoSchema);

app.get('/api/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post('/api/todos', async (req, res) => {
  const todo = await Todo.create({ task: req.body.task });
  res.json(todo);
});

app.delete('/api/todos', async (req, res) => {
  await Todo.findByIdAndDelete(req.query.id);
  res.json({ message: 'Deleted' });
});

module.exports = app;

