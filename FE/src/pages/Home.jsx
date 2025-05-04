import { useEffect, useState } from 'react';
import axios from 'axios';

// Use the environment variable instead of a relative path
const API = import.meta.env.VITE_API_URL;

function Home() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [operationError, setOperationError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      console.log('Attempting to fetch todos from:', API);
      
      const res = await axios.get(API);
      console.log('Response received:', res.data);
      
      if (Array.isArray(res.data)) {
        setTodos(res.data);
      } else {
        setTodos([]);
      }
      
      setError(null);
    } catch (err) {
      console.error('Fetch error:', err.message);
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
        headers: { 'Content-Type': 'application/json' }
      });
      
      console.log('Add todo response:', res.data);
      
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

  // Animated loading component
  if (loading && todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="animate-floating">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-sakura-400 to-sakura-600 
                         flex items-center justify-center shadow-lg mb-4">
            <div className="w-16 h-16 rounded-full border-4 border-t-transparent border-white 
                          animate-spin"></div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-sakura-400 mt-4 animate-pulse">
          Loading your tasks...
        </h2>
      </div>
    );
  }

  // Error display with animation
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 animate-fade-in">
        <div className="bg-red-900/30 border-2 border-red-500 rounded-lg p-6 max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Oops! Something went wrong</h2>
          <p className="text-white mb-6">{error}</p>
          <button 
            onClick={fetchTodos}
            className="anime-button bg-red-600 hover:bg-red-500 w-full"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Todo list with animations
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header with floating animation */}
        <div className="text-center mb-12 animate-floating">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sakura-400 to-sakura-600 
                        bg-clip-text text-transparent pb-2">
            Anime Todo List
          </h1>
          <p className="text-night-100 mt-2">Keep track of your anime watching schedule!</p>
        </div>
        
        {/* Error display */}
        {operationError && (
          <div className="bg-red-900/30 border border-red-500 rounded-lg p-3 mb-6 animate-pop">
            <p className="text-red-400">{operationError}</p>
          </div>
        )}
        
        {/* Add Todo form */}
        <div className="bg-night-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl mb-8 
                      border border-night-600 animate-fade-in">
          <form onSubmit={addTodo} className="flex flex-col sm:flex-row gap-3">
            <input 
              value={task} 
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter a new task..."
              className="anime-input flex-grow"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="anime-button sm:w-auto w-full flex items-center justify-center"
            >
              {loading ? (
                <><span className="animate-spin mr-2">⏳</span> Adding...</>
              ) : (
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                  Add Task
                </span>
              )}
            </button>
          </form>
        </div>
        
        {/* Todo list */}
        <div className="space-y-4">
          {todos.length === 0 ? (
            <div className="bg-night-700/50 rounded-xl p-8 text-center animate-fade-in">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-xl font-bold text-sakura-400">Your list is empty!</h3>
              <p className="text-night-200 mt-2">Add your first task above</p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-night-100 mb-4 pl-1">Your Tasks</h2>
              <ul className="space-y-3">
                {todos.map((todo, index) => (
                  <li 
                    key={todo.id || index} 
                    className="todo-card group animate-slide-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-white font-medium break-words pr-4">{todo.task}</span>
                      <button 
                        onClick={() => todo.id && deleteTodo(todo.id)} 
                        className="text-night-300 hover:text-red-400 transition-colors p-2 
                                 rounded-full hover:bg-night-600/50 group-hover:animate-bounce-once"
                        aria-label="Delete todo"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        
        {/* Anime decoration */}
        <div className="fixed bottom-4 right-4 opacity-70 hover:opacity-100 transition-opacity">
          <div className="w-24 h-24 bg-sakura-500/20 rounded-full flex items-center justify-center animate-floating">
            <div className="text-4xl">🌸</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
