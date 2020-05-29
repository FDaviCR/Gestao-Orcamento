const Sequelize = require("sequelize");
const connection = require("../../database/database");

const Fornecedor = connection.define('fornecedores',{
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    tipo_documento:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    cpf:{
        type: Sequelize.STRING,
        allowNull: true
    },
    cnpj:{
        type: Sequelize.STRING,
        allowNull: true
    },
    inscricao_municipal:{
        type: Sequelize.STRING,
        allowNull: true
    },
    inscricao_estadual:{
        type: Sequelize.STRING,
        allowNull: true
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

Fornecedor.sync({force:false});

module.exports = Fornecedor;