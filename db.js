const {Sequelize} = require('sequelize'); // ОРМ

module.exports = new Sequelize( //конструктор конфигурации
   process.env.DB_NAME,
   process.env.DB_USER,
   process.env.DB_PASSWORD,
   {
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.BD_PORT
   }
)