const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
const Task = require("./models/task");

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((err) => console.error("No se pudo conectar a MongoDB", err));

// Ruta para crear una tarea
app.post("/tasks", async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = new Task({
      title,
      description,
      status,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    await task.save();
    res.status(201).send({
      ok: true,
      message: "Tarea creada correctamente.",
      task,
    });
  } catch (error) {
    res.status(400).send({
      ok: false,
      message: "Error al crear la tarea.",
    });
  }
});

// Ruta para obtener todas las tareas
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    if (tasks.length === 0) {
      return res.status(404).send({
        ok: false,
        message: "No hay tareas guardadas.",
      });
    }
    res.status(200).send({
      ok: true,
      message: "Tareas obtenidas correctamente.",
      tasks,
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      message: "Error al obtener las tareas.",
    });
  }
});

// Ruta para obtener una tarea en específico
app.get("/tasks/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        ok: false,
        message: "El ID de la tarea no es válido.",
      });
    }
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).send({
        ok: false,
        message: "Tarea no encontrada.",
      });
    }

    res.status(200).send({
      ok: true,
      message: "Tarea obtenida correctamente.",
      task,
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      message: "Error al obtener la tarea.",
    });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`El server está corriendo en http://localhost:${port}`);
});
