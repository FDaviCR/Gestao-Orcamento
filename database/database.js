const Sequelize = require('sequelize');

const connection = new Sequelize(
    'aptumgst','root','password',
    {
        host: 'localhost',
        dialect: 'mysql',
        timezone: "-03:00"
    }
);

module.exports = connection;
