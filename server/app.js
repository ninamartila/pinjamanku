if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express()
const ScheduleController = require("./controllers/scheduleController");
const schedule = require("node-schedule");
const {errorHandler} = require("./middlewares/errorHandler")

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

schedule.scheduleJob('* 0 * * *', ScheduleController.ageLoan);

app.use(routes)

app.use(errorHandler);

module.exports = app;
