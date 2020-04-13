const Sequelize = require("sequelize");
const connection = require("../database/database");

const Estoque = require("./Estoques");
const Produto = require("./Produtos");
const EstoqueItens = require("./EstoqueItens");

const EstoqueMovimentacoes = connection.define('estoquemovimentacoes',{
    quantidade:{
        type: Sequelize.DECIMAL(18,2),
        allowNull: false
    },
    tipo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    usuario:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

EstoqueMovimentacoes.belongsTo(Estoque);
EstoqueMovimentacoes.belongsTo(Produto);
EstoqueMovimentacoes.belongsTo(EstoqueItens);

EstoqueMovimentacoes.sync({force:false});

module.exports = EstoqueMovimentacoes;