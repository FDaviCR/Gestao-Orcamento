const Sequelize = require("sequelize");
const connection = require("../database/database");

const Estoque = require("./Estoques");
const Produto = require("./Produtos");

const EstoqueItens = connection.define('estoqueItens',{
    quantidade:{
        type: Sequelize.DECIMAL(18,2),
        allowNull: false
    },
    unidade:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

EstoqueItens.belongsTo(Estoque);
EstoqueItens.belongsTo(Produto);

EstoqueItens.sync({force:false});

module.exports = EstoqueItens;