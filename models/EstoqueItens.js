const Sequelize = require("sequelize");
const connection = require("../database/database");

const Estoque = require("./Estoques");
const Produto = require("./Produtos");

const EstoqueItens = connection.define('estoqueitens',{
    quantidade:{
        type: Sequelize.DECIMAL(18,2),
        allowNull: false
    },
    apelido:{
        type: Sequelize.STRING,
        allowNull: true
    },
    unidade:{
        type: Sequelize.STRING,
        allowNull: false
    },
    usuario:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

EstoqueItens.belongsTo(Estoque);
EstoqueItens.belongsTo(Produto);

EstoqueItens.sync({force:false});

module.exports = EstoqueItens;