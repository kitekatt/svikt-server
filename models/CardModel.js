const  { CardProp }  = require('../models/models')
const  { Card }  = require('../models/models.js')
const  { Type } = require('../models/models.js')
const  { Category }  = require('../models/models.js')
const File = require('../services/File')
const ApiError = require('../error/ApiError.js')

class CardModel {
   async getAll(options) {
       const {categoryId, typeId, limit, page} = options
       const offset = (page - 1) * limit
       const where = {}
       if (categoryId) where.categoryId = categoryId
       if (typeId) where.typeId = typeId
       const cards = await Card.findAndCountAll({
           where,
           limit,
           offset,
           include: [
               {model: Type, as: 'type'},
               {model: Category, as: 'category'}
           ],
           order: [
               ['name', 'ASC'],
           ],
       })
       return cards
   }

   async getOne(id) {
       const card = await Card.findByPk(id, {
           include: [
               {model: Type, as: 'type'},
               {model: Category, as: 'category'},
           ]
       })
       if (!card) {
           throw new Error('Товар не найден в БД')
       }
       return card
   }

   async create(data, img) {
       // поскольку image не допускает null, задаем пустую строку
       const image = File.save(img) ?? ''
       const {name, price, description, categoryId = null, typeId = null} = data
       const card = await Card.create({name, price, description, image, categoryId, typeId})
       return card
   }

   async update(id, data, img) {
       const card = await Card.findByPk(id, {
           include: [{model: CardProp, as: 'props'}]
       })
       if (!card) {
           throw new Error('Товар не найден в БД')
       }
       // пробуем сохранить изображение, если оно было загружено
       const file = File.save(img)
       // если загружено новое изображение — надо удалить старое
       if (file && card.image) {
           File.delete(card.image)
       }
       // подготавливаем данные, которые надо обновить в базе данных
       const {
           name = card.name,
           price = card.price,
           description = card.description,
           categoryId = card.categoryId,
           typeId = card.typeId,
           image = file ? file : card.image
       } = data
       await card.update({name, price, description, categoryId, image, typeId})
       if (data.props) { // свойства товара
           // удаляем старые и добавляем новые
           await CardProp.destroy({where: {cardId: id}})
           const props = JSON.parse(data.props)
           for (let prop of props) {
               await CardProp.create({
                   name: prop.name,
                   value: prop.value,
                   productId: card.id
               })
           }
       }
       // обновим объект товара, чтобы вернуть свежие данные
       await card.reload()
       return card
   }

   async delete(id) {
    const card = await Card.findByPk(id)
    if (!card) {
        throw new Error('Товар не найден в БД')
    }
    if (card.image) { // удаляем изображение товара
        File.delete(card.image)
    }
    await card.destroy()
    return card
}

}

module.exports = new CardModel()