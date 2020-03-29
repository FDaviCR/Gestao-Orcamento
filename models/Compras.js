const Sequelize = require("sequelize");
const connection = require("../database/database");

const Fornecedor = require("./Fornecedores");

const Compras = connection.define('compras',{
    nota:{
        type: Sequelize.INTEGER,
        allowNull: true
    },
    valor:{
        type: Sequelize.DECIMAL(18,2),
        allowNull: true
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: true
    },
    usuario:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

Compras.belongsTo(Fornecedor);

Compras.sync({force:false});

module.exports = Compras;