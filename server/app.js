if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const schedule = require('node-schedule');
const rule = new schedule.RecurrenceRule();
rule.hour = 0;
rule.tz = 'Etc/UTC'; // format di inggris jadinya di kita pada pukul 7pagi

schedule.scheduleJob(rule, "<controller function yang mau di jalankan>");

app.use(routes)

module.exports = app