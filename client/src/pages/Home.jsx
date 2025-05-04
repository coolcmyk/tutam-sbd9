import { useEffect, useState } from 'react';
import axios from 'axios';

const API = '/api/todos'; // Serverless endpoint on Vercel

function Home() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [operationError, setOperationError] = useState(null);

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API);
      console.log('API response:', res.data);
      
      // Handle different response formats
      if (Array.isArray(res.data)) {
        setTodos(res.data);
      } else if (res.data && typeof res.data === 'object') {
        // Check if it's an object with a data/items/todos property
        if (Array.isArray(res.data.data)) {
          setTodos(res.data.data);
        } else if (Array.isArray(res.data.todos)) {
          setTodos(res.data.todos);
        } else if (Array.isArray(res.data.items)) {
          setTodos(res.data.items);
        } else {
          // If it's a single todo object, wrap it in an array
          setTodos(res.data.id ? [res.data] : []);
        }
      } else {
        setTodos([]);
        console.error('Unexpected data format:', res.data);
      }
      
      setError(null);
    } catch (err) {
      console.error('Error fetching todos:', err);
      setError('Failed to fetch todos: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (e) => {
    e?.preventDefault();
    
    if (!task.trim()) {
      setOperationError('Task cannot be empty');
      return;
    }
    
    try {
      setOperationError(null);
      setLoading(true);
      
      const res = await axios.post(API, { task: task.trim() }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Add todo response:', res.data);
      
      // Add the new todo to the list
      if (res.data && res.data.id) {
        setTodos(prevTodos => [...prevTodos, res.data]);
        setTask('');
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error adding todo:', err);
      setOperationError('Failed to add todo: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    try {
      setOperationError(null);
      await axios.delete(`${API}?id=${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
      setOperationError('Failed to delete todo');
    }
  };

  // Safe rendering with explicit array check
  const renderTodoList = () => {
    if (!Array.isArray(todos)) {
      console.error('todos is not an array:', todos);
      return <p>Error: Data format is incorrect</p>;
    }
    
    if (todos.length === 0) {
      return <p>No todos yet. Add one above!</p>;
    }
    
    return (
      <ul>
        {todos.map((todo) => (
          <li key={todo.id || Math.random()}>
            {todo.task}{' '}
            <button onClick={() => todo.id && deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={fetchTodos}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Todo List</h1>
      
      {operationError && (
        <div style={{ color: 'red', margin: '10px 0' }}>
          {operationError}
        </div>
      )}
      
      <form onSubmit={addTodo}>
        <input 
          value={task} 
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <button type="submit">Add</button>
      </form>
      
      {renderTodoList()}
    </div>
  );
}

export default Home;
