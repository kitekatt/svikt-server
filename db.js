const {Sequelize} = require('sequelize')
//настройка подключения к серверу бд

module.exports = new Sequelize(
   process.env.DB_NAME, //название бд
   process.env.DB_USER, //пользователь
   process.env.DB_PASSWORD, //пароль
   {
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      define:{
         underscored: true,
         timestamps: false,
      }
   }
)