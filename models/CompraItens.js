const Sequelize = require("sequelize");
const connection = require("../database/database");

const Compra = require("./Compras");
const Produto = require("./Produtos");
const EstoqueItens = require("./EstoqueItens");

const CompraItens = connection.define('compraitens',{
    quantidade:{
        type: Sequelize.DECIMAL(18,2),
        allowNull: false
    },
    valor:{
        type: Sequelize.DECIMAL(18,2),
        allowNull: false
    },
    unidade:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

CompraItens.belongsTo(EstoqueItens);
CompraItens.belongsTo(Compra);
CompraItens.belongsTo(Produto);

CompraItens.sync({force:false});

module.exports = CompraItens;