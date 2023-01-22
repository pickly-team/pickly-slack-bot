const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const schedule = require('node-schedule');

const indexRouter = require('./routes/index');
const scheduleGithub = require('./app/github');
require("dotenv").config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

const reminder = schedule.scheduleJob("0 0 16 * * 1-5", function () {
  scheduleGithub();
});

module.exports = app;
