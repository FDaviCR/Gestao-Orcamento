const Sequelize = require("sequelize");
const connection = require("../database/database");


const Fornecedor = connection.define('fornecedores',{
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf:{
        type: Sequelize.STRING,
        allowNull: false
    },
    cnpj:{
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone1:{
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone2:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    endereco:{
        type: Sequelize.STRING,
        allowNull: false
    },
    numero:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

Fornecedor.sync({force:false});

module.exports = Fornecedor;