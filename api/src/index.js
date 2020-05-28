const express = require("express");
const routes = require("./routes");
const connection = require("../database/database");

const app = express();

app.use(express.json());
app.use(routes);

//Database
connection.authenticate()
    .then(()=>{
        console.log("Conexão feita com o banco de dados!")
    })
    .catch((msgErro)=>{
        console.log(msgErro);
    })

app.listen(5000, () => {
    console.log("O servidor está rodando!")
});