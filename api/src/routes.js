const express = require("express");

const routes = express.Router();

const UsersController = require("./controllers/UsersController");


routes.get('/users', UsersController.list);
routes.get('/users/:id', UsersController.listOne);
routes.post('/users', UsersController.create);
routes.delete('/users/:id', UsersController.delete);

module.exports = routes;