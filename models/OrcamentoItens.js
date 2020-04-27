const Sequelize = require("sequelize");
const connection = require("../database/database");

const Orcamento = require("./Orcamentos");
const Produto = require("./Produtos");

const OrcamentoItens = connection.define('orcamentoitens',{
    quantidade:{
        type: Sequelize.BIGINT,
        allowNull: false
    },
    valorUnitario:{
        type: Sequelize.DECIMAL(18,2),
        allowNull: false
    },
    valorTotal:{
        type: Sequelize.DECIMAL(18,2),
        allowNull: false
    },
    usuario:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

OrcamentoItens.belongsTo(Orcamento);
OrcamentoItens.belongsTo(Produto);

OrcamentoItens.sync({force:false});

module.exports = OrcamentoItens;