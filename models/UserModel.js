const  { User }  = require('../models/models')

class UserModel {
   async getAll() {
       const users = await User.findAll()
       return users
   }
   async getOne(id) {
       const user = await User.findByPk(id)
       if (!user) {
           throw new Error('Пользователь не найден в БД')
       }
       return user
   }
   async getByEmail(email) {
       const user = await User.findOne({where: {email}})
       if (!user) {
           throw new Error('Пользователь не найден в БД')
       }
       return user
   }
   async create(data) {
       const {email, password, role} = data
       const check = await User.findOne({where: {email}})
       if (check) {
           throw new Error('Пользователь уже существует')
       }
       const user = await User.create({email, password, role})
       return user
   }
}

module.exports = new UserModel()