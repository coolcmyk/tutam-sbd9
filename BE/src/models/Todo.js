const db = require('../config/db');

class Todo {
  // Find all todos
  static async findAll() {
    const { rows } = await db.query('SELECT * FROM todos ORDER BY id ASC');
    return rows;
  }

  // Create a todo
  static async create(task) {
    const { rows } = await db.query(
      'INSERT INTO todos (task) VALUES ($1) RETURNING *',
      [task]
    );
    return rows[0];
  }

  // Delete a todo
  static async delete(id) {
    await db.query('DELETE FROM todos WHERE id = $1', [id]);
    return true;
  }
}

module.exports = Todo;