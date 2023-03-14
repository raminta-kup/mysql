require("dotenv").config();
const express = require("express");
const cors = require("cors");
const tasksRouter = require("./router/tasks");
const assignmentsRouter = require("./router/assignments");
const usersRouter = require("./router/users");

const app = express();

app.use(cors());
app.use(express.json());
app.use(tasksRouter);
app.use(assignmentsRouter);
app.use(usersRouter);

app.listen(3000, () => {
    console.log("server is running on port 3000");
});