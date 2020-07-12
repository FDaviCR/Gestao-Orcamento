const Sequelize = require("sequelize");
const connection = require("../database/database");

const Unidade = connection.define('unidades',{
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    ativo:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    usuario:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

Unidade.sync({force:false});

module.exports = Unidade;