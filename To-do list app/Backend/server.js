const express = require('express');
const cors = require('cors')
const mongoose =require('mongoose')
const TodoModel = require('./Models/todo')

const app = express();

app.use(cors())
app.use(express.json())


const port = process.env.PORT || 8000;

app.get("/todos", async (req, res) => {
    try {
        const todos = await TodoModel.find().sort({ createdAt: -1 })
        res.json(todos)
    } catch (err) {
        console.error("Failed to load tasks:", err)
        res.status(500).json({ error: "Failed to load tasks" })
    }
})

app.post("/add", async (req, res) => {
    console.log("Received POST /add")
    const task = typeof req.body?.task === "string" ? req.body.task.trim() : ""
    if (task.length === 0) {
        console.error("Rejected POST /add: request body must include a non-empty task")
        return res.status(400).json({ error: "Task is required" })
    }

    try {
        const result = await TodoModel.create({ task })
        console.log(`Saved todo ${result._id} to ${mongoose.connection.name}.${TodoModel.collection.name}`)
        res.status(201).json(result)
    } catch (err) {
        console.error("Failed to save task:", err)
        res.status(500).json({ error: "Failed to save task" })
    }
})

app.patch("/todos/:id", async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: "Invalid task ID" })
    }

    const updates = {}
    if (typeof req.body?.task === "string" && req.body.task.trim()) {
        updates.task = req.body.task.trim()
    }
    if (typeof req.body?.completed === "boolean") {
        updates.completed = req.body.completed
    }
    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: "Provide a valid task or completion status" })
    }

    try {
        const todo = await TodoModel.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true
        })
        if (!todo) {
            return res.status(404).json({ error: "Task not found" })
        }
        res.json(todo)
    } catch (err) {
        console.error("Failed to update task:", err)
        res.status(500).json({ error: "Failed to update task" })
    }
})

app.delete("/todos/:id", async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: "Invalid task ID" })
    }

    try {
        const todo = await TodoModel.findByIdAndDelete(req.params.id)
        if (!todo) {
            return res.status(404).json({ error: "Task not found" })
        }
        res.status(204).end()
    } catch (err) {
        console.error("Failed to delete task:", err)
        res.status(500).json({ error: "Failed to delete task" })
    }
})

async function startServer() {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/config")
    console.log(`Connected to MongoDB database: ${mongoose.connection.name}`)

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
}

startServer().catch((err) => {
    console.error("Could not connect to MongoDB; server was not started:", err)
    process.exit(1)
})