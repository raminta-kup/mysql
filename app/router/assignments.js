const express = require("express");
const { codeacademyConnection } = require("../db");

const router = express.Router();

router.get('/assignments', (req, res) => {
    const { done } = req.query;

    if (done === '0' || done === '1') {
        codeacademyConnection.execute(
            'SELECT * FROM assignments WHERE done=?',
            [done],
            (err, result) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json(result);
                }
            }
        )
    } else {
        codeacademyConnection.execute('SELECT * FROM assignments', (err, result) => {
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
        });
    }
});

router.post("/assignments", (req, res) => {
    const { body } = req;
    codeacademyConnection.execute("INSERT INTO assignments (name, done) VALUES (?, ?)", [body.name, body.done], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    })
});

router.patch("/assignments/:id", (req, res) => {
    const { body } = req;
    const { id } = req.params;
    let sqlQuery = "UPDATE assignments SET ";
    const valuesArr = [];

    if (body.name) {
        sqlQuery += "name=?";
        valuesArr.push(body.name);
    }

    if (body.done === 0 || body.done === 1) {
        sqlQuery += (body.name ? ", " : "") + "done=?";
        valuesArr.push(body.done);
    }
    sqlQuery += " WHERE id=?";
    valuesArr.push(id);

    codeacademyConnection.execute(
        sqlQuery,
        valuesArr,
        (err, result) => {
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
        });
});

router.delete("/assignments/:id", (req, res) => {
    const { id } = req.params;
    codeacademyConnection.execute(
        "DELETE FROM assignments WHERE id=?",
        [id],
        (err, result) => {
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
        }
    );
});


module.exports = router;