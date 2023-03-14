const express = require("express");
const router = express.Router();
const { tasksManagerConnection } = require("../db");

router.get("/users", (req, res) => {
    tasksManagerConnection.execute("SELECT * FROM users", (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    })
});

router.post("/users", (req, res) => {
    const { body } = req;
    tasksManagerConnection.execute("INSERT INTO users (name, email) VALUES (?, ?)", [body.name, body.email], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    })
});

router.patch("/users/:id", (req, res) => {
    const { body } = req;
    const { id } = req.params;
    const valuesArr = [];
    let sqlQuery = "UPDATE users SET ";

    if (body.name) {
        sqlQuery += "name=?";
        valuesArr.push(body.name);
    }

    if (body.email) {
        sqlQuery += (body.name ? ", " : "") + "email=?";
        valuesArr.push(body.email);
    }

    sqlQuery += " WHERE id=?";
    valuesArr.push(id);

    tasksManagerConnection.execute(
        sqlQuery,
        valuesArr,
        (err, result) => {
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
        }
    )
});

router.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    tasksManagerConnection.execute(
        "DELETE FROM users WHERE id=?",
        [id],
        (err, result) => {
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
        }
    )
});


module.exports = router;