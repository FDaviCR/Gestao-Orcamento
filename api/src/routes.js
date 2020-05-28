const express = require("express");

const routes = express.Router();

const UserController = require("./controllers/UserController");
const UsersController = require("./controllers/UsersController");

routes.get('/user/:id', UserController.list);
routes.put('/user/:id', UserController.inactivate);

routes.get('/users', UsersController.list);
routes.post('/users', UsersController.create);
routes.delete('/users/:id', UsersController.delete);

module.exports = routes;