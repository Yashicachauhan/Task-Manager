// backend/server.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Define a route handler for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to your Task Management Application");
});
app.get("/api", (req, res) => {
  res.send("Welcome to API, use (http://localhost:3000/api/tasks) for tasks");
});

app.use(bodyParser.json());
app.use(cors());

let tasks = [
  {
    id: 1,
    title: "Task 1",
    description: "Description for Task 1",
    dueDate: "2024-06-27",
  },
  {
    id: 2,
    title: "Task 2",
    description: "Description for Task 2",
    dueDate: "2024-06-28",
  },
];

// Endpoint to get all tasks
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// Endpoint to create a new task
app.post("/api/tasks", (req, res) => {
  const task = req.body;
  task.id = tasks.length + 1;
  tasks.push(task);
  res.status(201).json(task);
});

// Endpoint to get a single task by ID
app.get("/api/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === id);
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

// Endpoint to update an existing task
app.put("/api/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedTask = req.body;
  tasks = tasks.map((task) => (task.id === id ? updatedTask : task));
  res.json(updatedTask);
});

// Endpoint to delete a task
app.delete("/api/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter((task) => task.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
