const Sequelize = require("sequelize");
const connection = require("../database/database");


const Produto = connection.define('produtos',{
    produto:{
        type: Sequelize.STRING,
        allowNull: false
    },
    valor:{
        type: Sequelize.DECIMAL(15,2),
        allowNull: false
    },
    custo:{
        type: Sequelize.DECIMAL(15,2),
        allowNull: true
    },
    unidade:{
        type: Sequelize.STRING,
        allowNull: false
    },
    usuario:{
        type: Sequelize.STRING,
        allowNull: false
    },
    ativo:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
})

Produto.sync({force:false});

module.exports = Produto;