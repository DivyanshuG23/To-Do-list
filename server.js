const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Temporary data (no database)
let todos = [];
let idCounter = 1;

// CREATE (Add Todo)
app.post("/api/todos", (req, res) => {
  const newTodo = {
    id: idCounter++,
    task: req.body.task
  };
  todos.push(newTodo);
  res.json(newTodo);
});

// READ (Get all Todos)
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

// UPDATE (Edit Todo)
app.put("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (todo) {
    todo.task = req.body.task;
    res.json(todo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

// DELETE (Remove Todo)
app.delete("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.json({ message: "Todo deleted" });
});

app.listen(3000, () => {
  console.log("Backend running on port 5000");
});