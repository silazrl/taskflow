const express = require("express");
const tasks = require("../data/tasks");
const router = express.Router();

router.get("/", (req, res) => {
    res.json(tasks);
});


router.get("/:id", (req, res) => {
    const taskId = Number(req.params.id);

    const task = tasks.find(task => task.id === taskId);

    if (!task) {
        return res.status(404).json({ message: "Görev bulunamadı" });
    }

    res.json(task);
});

router.post("/", (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        description: req.body.description,
        assignee: req.body.assignee,
        status: "pending",
        priority: req.body.priority,
        createdAt: new Date()
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});


router.put("/:id", (req, res) => {
    const taskId = Number(req.params.id);

    const task = tasks.find(task => task.id === taskId);

    if (!task) {
        return res.status(404).json({ message: "Görev bulunamadı" });
    }

    task.title = req.body.title ?? task.title;
    task.description = req.body.description ?? task.description;
    task.assignee = req.body.assignee ?? task.assignee;
    task.priority = req.body.priority ?? task.priority;
    task.status = req.body.status ?? task.status;

    res.json(task);
});


router.delete("/:id", (req, res) => {
    const taskId = Number(req.params.id);

    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ message: "Görev bulunamadı" });
    }

    tasks.splice(taskIndex, 1);

    res.json({ message: "Görev başarıyla silindi" });
});


module.exports = router;