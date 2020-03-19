const express = require("express");
const session = require("express-session");
const app = express();
const bodyParser = require("body-parser"); //Importando Body Parser
const connection = require("./database/database");
const adminAuth = require("./middleware/adminAuth");


const usersController = require("./controllers/UsersController");
const produtosController = require("./controllers/ProdutosController");
const clientesController = require("./controllers/ClientesController");
const fornecedoresController = require("./controllers/FornecedoresController");
const orcamentosController = require("./controllers/OrcamentosController");
const orcamentoItensController = require("./controllers/OrcamentoItensController");
const estoqueController = require("./controllers/EstoquesController");


const User = require("./models/Users");
const Produtos = require("./models/Produtos");
const Clientes = require("./models/Clientes");
const Fornecedores = require("./models/Fornecedores");
const Orcamento = require("./models/Orcamentos");
const OrcamentoItens = require("./models/OrcamentoItens");
const Estoques = require("./models/Estoques");

// View engine
app.set('view engine','ejs');

//Sessions
app.use(session({
    secret: "youshallnotpass", cookie: { maxAge: 14400000},
    saveUninitialized: true,
    resave: true
}))

//Arquivos estaticos
app.use(express.static('public'));

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Database
connection.authenticate()
    .then(()=>{
        console.log("Conexão feita com o banco de dados!")
    })
    .catch((msgErro)=>{
        console.log(msgErro);
    })

app.use("/", usersController);
app.use("/", produtosController);
app.use("/", clientesController);
app.use("/", fornecedoresController);
app.use("/", orcamentosController);
app.use("/", orcamentoItensController);
app.use("/", estoqueController);

// Router
app.get("/", adminAuth, (req, res) => {
    res.render("index.ejs");
})


// End Router
app.listen(3000, () => {
    console.log("O servidor está rodando!")
})



