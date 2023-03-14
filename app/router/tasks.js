const express = require("express");
const { tasksManagerConnection } = require("../db");

const router = express.Router();

router.get("/tasks", (req, res) => {
    tasksManagerConnection.execute("SELECT * FROM tasks", (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    })
});

router.post("/tasks", (req, res) => {
    const { body } = req;
    tasksManagerConnection.execute("INSERT INTO tasks (toDo) VALUE (?)", [body.toDo], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    })
})

module.exports = router;
