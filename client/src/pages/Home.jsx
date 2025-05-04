import { useEffect, useState } from 'react';
import axios from 'axios';

const API = '/api/todos'; // Serverless endpoint on Vercel

function Home() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    axios.get(API).then(res => setTodos(res.data));
  }, []);

  const addTodo = async () => {
    const res = await axios.post(API, { task });
    setTodos([...todos, res.data]);
    setTask('');
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}?id=${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input value={task} onChange={e => setTask(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            {todo.task} <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Home;

