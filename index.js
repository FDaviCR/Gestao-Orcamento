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
const estoqueItensController = require("./controllers/EstoqueItensController");
const estoqueMovimentacoesController = require("./controllers/EstoqueMovimentacoesController");
const comprasController = require("./controllers/ComprasController");
const compraItensController = require("./controllers/CompraItensController");
const unidadesController = require("./controllers/UnidadesController");
const categoriasController = require("./controllers/CategoriasController");

const User = require("./models/Users");
const Produtos = require("./models/Produtos");
const Clientes = require("./models/Clientes");
const Fornecedores = require("./models/Fornecedores");
const Orcamento = require("./models/Orcamentos");
const OrcamentoItens = require("./models/OrcamentoItens");
const Estoques = require("./models/Estoques");
const EstoqueItens = require("./models/EstoqueItens");
const EstoqueMovimentacoes = require("./models/EstoqueMovimentacoes");
const Compras = require("./models/Compras");
const CompraItens = require("./models/CompraItens");
const Categorias = require("./models/Categorias");
const Unidades =  require("./models/Unidades");

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
app.use('/public', express.static('public'));
app.use('/public/img/', express.static('./public/img'));

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
app.use("/", estoqueItensController);
app.use("/", estoqueMovimentacoesController);
app.use("/", comprasController);
app.use("/", compraItensController);
app.use("/", categoriasController);
app.use("/", unidadesController);

// Router
app.get("/", adminAuth, (req, res) => {
    res.render("index.ejs");
})

// End Router
app.listen(3000, () => {
    console.log("O servidor está rodando!")
})



