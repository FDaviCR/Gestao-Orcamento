const Sequelize = require("sequelize");
const connection = require("../database/database");


const Estoque = connection.define('estoques',{
    descricao:{
        type: Sequelize.STRING,
        allowNull: false
    },
    detalhes:{
        type: Sequelize.TEXT,
        allowNull: true
    },
    status:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

Estoque.sync({force:false});

module.exports = Estoque;