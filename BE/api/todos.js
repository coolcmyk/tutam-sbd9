import todoController from '../src/controllers/todoController';


export default async function handler(req, res) {
  // Update CORS headers to be more permissive
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS, PUT, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Cache-Control, cache-control, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    switch (req.method) {
      case 'GET': {
        const todos = await todoController.getAllTodos();
        return res.status(200).json(todos);
      }

      case 'POST':
        return await todoController.createTodo(req, res);

      case 'DELETE':
        return await todoController.deleteTodo(req, res);

      default:
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}