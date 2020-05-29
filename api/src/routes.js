const express = require("express");
const routes = express.Router();

const UserController = require("./controllers/UserController");
const UsersController = require("./controllers/UsersController");
const ClientController = require("./controllers/ClientController");
const ClientsController = require("./controllers/ClientsController");

routes.get('/user/:id', UserController.list);
routes.put('/user/:id', UserController.inactivate);

routes.get('/users', UsersController.list);
routes.post('/users', UsersController.create);
routes.delete('/users/:id', UsersController.delete);

routes.get('/client/:id', ClientController.list);
routes.put('/client/:id', ClientController.inactivate);

routes.post('/clients', ClientsController.create);
routes.get('/clients', ClientsController.list);
routes.delete('/clients/:id', ClientsController.delete);
routes.put('/clients/:id', ClientsController.edit);

module.exports = routes;