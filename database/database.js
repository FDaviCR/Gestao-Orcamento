const Sequelize = require('sequelize');

const connection = new Sequelize(
    'aptumgst','root1994','password',
    {
        host: 'mysql669.umbler.com',
        dialect: 'mysql',
        timezone: "-03:00"
    }
    /*
    'aptumgst','root','password',
    {
        host: 'localhost',
        dialect: 'mysql',
        timezone: "-03:00"
    }
    */
);

module.exports = connection;
