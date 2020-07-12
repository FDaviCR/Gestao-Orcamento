const Sequelize = require("sequelize");
const connection = require("../database/database");

const Categoria = connection.define('categorias',{
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

Categoria.sync({force:false});

module.exports = Categoria;