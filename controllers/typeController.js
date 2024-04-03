const TypeModel = require("../models/TypeModel")
const ApiError = require('./../error/ApiError')

class TypeController {
   async getAll(req, res, next) {
       try {
           const types = await TypeModel.getAll()
           res.json(types)
       } catch(e) {
           next(ApiError.badRequest(e.message))
       }
   }
   async getOne(req, res, next) {
       try {
           if (!req.params.id) {
               throw new Error('Не указан id типа')
           }
           const type = await TypeModel.getOne(req.params.id)
           res.json(type)
       } catch(e) {
           next(ApiError.badRequest(e.message))
       }
   }
   async create(req, res, next) {
       try {
           if (!req.body.name) {
               throw new Error('Нет названия типа')
           }
           const type = await TypeModel.create(req.body)
           res.json(type)
       } catch(e) {
           next(ApiError.badRequest(e.message))
       }
   }
   async update(req, res, next) {
       try {
           if (!req.params.id) {
               throw new Error('Не указан id типа')
           }
           if (!req.body.name) {
               throw new Error('Нет названия типа')
           }
           const type = await TypeModel.update(req.params.id, req.body)
           res.json(type)
       } catch(e) {
           next(ApiError.badRequest(e.message))
       }
   }
   async delete(req, res, next) {
       try {
           if (!req.params.id) {
               throw new Error('Не указан id типа')
           }
           const type = await TypeModel.delete(req.params.id)
           res.json(type)
       } catch(e) {
           next(ApiError.badRequest(e.message))
       }
   }
}

module.exports = new TypeController()