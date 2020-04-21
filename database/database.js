const Sequelize = require('sequelize');

const connection = new Sequelize(
    'aptumgst','fdavi','senhaatual',
    {
        host: 'mysql669.umbler.com',
        dialect: 'mysql',
        timezone: "-03:00"
    }
);

/*
const connection = new Sequelize(
    'aptumgst','root','12345',
    {
        host: 'localhost',
        dialect: 'mysql',
        timezone: "-03:00"
    }
);


const connection = new Sequelize(
    'teste','postgres','shinobiwar',
{
    host: 'localhost',
    dialect: 'postgres',
    timezone: "-03:00"
});
*/
module.exports = connection;
