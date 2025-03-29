require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI);

const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

const TaskSchema = new mongoose.Schema({
    userId: String,
    text: String,
    completed: Boolean,
    dueDate: Date,
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium",
    }
});

const User = mongoose.model("User", UserSchema);
const Task = mongoose.model("Task", TaskSchema);

app.get("/", (req, res) => {
    res.send("Backend is working");
});

app.post("/api/register", async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({ username: req.body.username, password: hashedPassword });
    await user.save();
    res.json({ message: "User registered." });
});

app.post("/api/login", async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user || !await bcrypt.compare(req.body.password, user.password)) {
        return res.status(400).json({ message: "Invalid login details!" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json(token);
});

app.get("/api/tasks", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const tasks = await Task.find({ userId });
    res.json(tasks);
});

app.post("/api/tasks", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const task = new Task({ 
        userId, 
        text: req.body.text, 
        completed: false, 
        dueDate: req.body.dueDate || null, 
        priority: req.body.priority || "medium"
    });
    await task.save();
    res.json(task);
});

app.put("/api/tasks/:id", async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (req.body.text !== undefined) task.text = req.body.text;
    if (req.body.completed !== undefined) task.completed = req.body.completed;
    if (req.body.dueDate !== undefined) task.dueDate = req.body.dueDate;
    if (req.body.priority !== undefined) task.priority = req.body.priority;

    await task.save();
    res.json(task);
});

app.delete("/api/tasks/:id", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const task = await Task.findById(req.params.id);

    if (task.userId !== userId) {
        return res.status(403).json({ message: "Forbidden"});
    }

    await task.deleteOne();
    res.json({ message: "Task deleted."});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));