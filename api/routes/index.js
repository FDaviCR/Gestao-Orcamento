const express = require("express");

const app = express();

app.use(express.json());

const router = require('express').Router();

app.listen(5000);