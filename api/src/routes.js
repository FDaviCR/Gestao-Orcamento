const express = require("express");
const routes = express.Router();
const auth = require("./middleware/auth");

const SessionController = require("./controllers/SessionController");
const UserController = require("./controllers/UserController");
const UsersController = require("./controllers/UsersController");
const ClientController = require("./controllers/ClientController");
const ClientsController = require("./controllers/ClientsController");
const ProductController = require("./controllers/ProductController");
const ProductsController = require("./controllers/ProductsController");
const ProviderController = require("./controllers/ProviderController");
const ProvidersController = require("./controllers/ProvidersController");
const BudgetController = require("./controllers/BudgetController");
const BudgetsController = require("./controllers/BudgetsController");
const BudgetItemController = require("./controllers/BudgetItemController");
const BudgetItemsController = require("./controllers/BudgetItemsController");


routes.post('/session', SessionController.create);

routes.get('/user/:id', auth, UserController.list);
routes.put('/user/:id', auth, UserController.inactivate);

routes.get('/users', auth, UsersController.list);
routes.post('/users', auth, UsersController.create);
routes.delete('/users/:id', auth, UsersController.delete);

routes.get('/client/:id', auth, ClientController.list);
routes.put('/client/:id', auth, ClientController.inactivate);

routes.post('/clients', auth, ClientsController.create);
routes.get('/clients', auth, ClientsController.list);
routes.delete('/clients/:id', auth, ClientsController.delete);
routes.put('/clients/:id', auth, ClientsController.edit);

routes.get('/product/:id', auth, ProductController.list);
routes.put('/product/:id', auth, ProductController.inactivate);

routes.post('/products', auth, ProductsController.create);
routes.get('/products', auth, ProductsController.list);
routes.delete('/products/:id', auth, ProductsController.delete);
routes.put('/products/:id', auth, ProductsController.edit);

routes.get('/provider/:id', auth, ProviderController.list);
routes.put('/provider/:id', auth, ProviderController.inactivate);

routes.post('/providers', auth, ProvidersController.create);
routes.get('/providers', auth, ProvidersController.list);
routes.delete('/providers/:id', auth, ProvidersController.delete);
routes.put('/providers/:id', auth, ProvidersController.edit);

routes.get('/budget/:id', auth, BudgetController.list);
routes.put('/budget/:id', auth, BudgetController.inactivate);

routes.post('/budgets', auth, BudgetsController.create);
routes.get('/budgets', auth, BudgetsController.list);
routes.delete('/budgets/:id', auth, BudgetsController.delete);
routes.put('/budgets/:id', auth, BudgetsController.edit);

routes.get('/budgetItem/:id', auth, BudgetItemController.list);

routes.post('/budgetItems', auth, BudgetItemsController.create);
routes.get('/budgetItems', auth, BudgetItemsController.list);
routes.delete('/budgetItems/:id', auth, BudgetItemsController.delete);
routes.put('/budgetItems/:id', auth, BudgetItemsController.edit);

module.exports = routes;