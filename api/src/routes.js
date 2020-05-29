const express = require("express");
const routes = express.Router();

const UserController = require("./controllers/UserController");
const UsersController = require("./controllers/UsersController");
const ClientController = require("./controllers/ClientController");
const ClientsController = require("./controllers/ClientsController");
const ProductController = require("./controllers/ProductController");
const ProductsController = require("./controllers/ProductsController");
const ProviderController = require("./controllers/ProviderController");
const ProvidersController = require("./controllers/ProvidersController");

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

routes.get('/product/:id', ProductController.list);
routes.put('/product/:id', ProductController.inactivate);

routes.post('/products', ProductsController.create);
routes.get('/products', ProductsController.list);
routes.delete('/products/:id', ProductsController.delete);
routes.put('/products/:id', ProductsController.edit);

routes.get('/provider/:id', ProviderController.list);
routes.put('/provider/:id', ProviderController.inactivate);

routes.post('/providers', ProvidersController.create);
routes.get('/providers', ProvidersController.list);
routes.delete('/providers/:id', ProvidersController.delete);
routes.put('/providers/:id', ProvidersController.edit);


module.exports = routes;