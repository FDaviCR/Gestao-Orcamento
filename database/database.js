const Sequelize = require('sequelize');

const connection = new Sequelize(
    'aptumgst','root','soeusei',
    {
        host: 'localhost',
        dialect: 'mysql',
        timezone: "-03:00"
    }
);

/*
const connection new Sequelize(
    'teste','postgres','shinobiwar',
{
    host: 'localhost',
    dialect: 'postgres',
    timezone: "-03:00"
});
*/
module.exports = connection;
