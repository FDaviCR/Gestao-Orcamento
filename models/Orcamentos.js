const Sequelize = require("sequelize");
const connection = require("../database/database");

const Clientes = require("./Clientes");

const Orcamento = connection.define('orcamentos',{

    tipo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    formPagamento:{
        type: Sequelize.STRING,
        allowNull: false
    },
    valor:{
        type: Sequelize.DECIMAL(15,2)
    },
    aprovado:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
})

Orcamento.belongsTo(Clientes);

Orcamento.sync({force:false});

module.exports = Orcamento;