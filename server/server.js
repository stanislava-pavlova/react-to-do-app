const PORT = 8000;
const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');

app.use(cors());

// get all todos
// app.get('/todos', async (req, res) => {
//   try {
//     const todos = await pool.query('SELECT * FROM todos');
//     res.json(todos.rows);
//   } catch (err) {
//     console.error(err);
//   }
// });

app.get('/todos/:userEmail', async (req, res) => {
  const { userEmail } = req.params;
  try {
    const todos = await pool.query(
      'SELECT * FROM todos WHERE user_email = $1',
      [userEmail]
    );
    res.json(todos.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
