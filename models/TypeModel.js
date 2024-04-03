const { Type } = require('../models/models')
const ApiError = require('../error/ApiError')

class TypeModel {
   async getAll() {
       const types = await Type.findAll({
           order: [
               ['name', 'ASC'],
           ],
       })
       return types
   }

   async getOne(id) {
       const type = await Type.findByPk(id)
       if (!brand) {
           throw new Error('Тип не найден в БД')
       }
       return type
   }

   async create(data) {
       const {name} = data
       const type = await Type.create({name})
       return type
   }

   async update(id, data) {
       const type = await Type.findByPk(id)
       if (!type) {
           throw new Error('Тип не найден в БД')
       }
       const {name = type.name} = data
       await type.update({name})
       return type
   }

   async delete(id) {
       const type = await Type.findByPk(id)
       if (!type) {
           throw new Error('Типа не найден в БД')
       }
       await type.destroy()
       return type
   }
}

module.exports = new TypeModel()