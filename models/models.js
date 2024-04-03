const sequelize = require('../db')
const database = require('sequelize')

const {DataTypes} = database
//описание моделей бд

//пользователь
const User = sequelize.define('user', {
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
   email: {type: DataTypes.STRING, unique: true},
   password: {type: DataTypes.STRING},
   role: {type: DataTypes.STRING, defaultValue: 'USER'},
})
//товар
const Card = sequelize.define('card', {
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
   name: {type: DataTypes.STRING, unique: true, allowNull: false},
   price: {type: DataTypes.STRING, allowNull: false},
   description: {type: DataTypes.STRING, allowNull: false},
   image: {type: DataTypes.STRING, allowNull: false}
})
//категории товаров
const Category = sequelize.define('category', {
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
   name: {type: DataTypes.STRING, unique: true, allowNull: false},
})
//тип товаров
const Type = sequelize.define('type', {
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
   name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

//описание связей

// в категории и типе может быть несколько товаров, но каждый товар может иметь
// только один тип и категорию
Category.hasMany(Card, {onDelete: 'RESTRICT'})
Card.belongsTo(Category)
Type.hasMany(Card, {onDelete: 'RESTRICT'})
Card.belongsTo(Type)

module.exports = {
   User,
   Card,
   Category,
   Type,
}