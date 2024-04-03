const {Card} = require("../models/models")
const ApiError = require("../error/ApiError")
const CardModel = require("../models/CardModel")
const FileService = require("../services/File")
const CardProps = require("../models/models")

class CardController {
    async getAll(req, res, next) {
        try {
            const {categoryId = null, typeId = null} = req.params
            let {limit = null, page = null} = req.query
            limit = limit && /[0-9]+/.test(limit) && parseInt(limit) ? parseInt(limit) : 3
            page = page && /[0-9]+/.test(page) && parseInt(page) ? parseInt(page) : 1
            const options = {categoryId, typeId, limit, page}
            const cards = await CardModel.getAll(options)
            res.json(cards)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const card = await CardModel.getOne(req.params.id)
            res.json(card)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async create(req, res, next) {
        try {
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для создания')
            }
            const card = await CardModel.create(req.body, req.files?.image)
            res.json(card)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для обновления')
            }
            const card = await CardModel.update(req.params.id, req.body, req.files?.image)
            res.json(card)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const card = await CardModel.delete(req.params.id)
            res.json(card)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new CardController()