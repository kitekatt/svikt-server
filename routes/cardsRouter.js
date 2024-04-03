const express = require('express')
const router = new express.Router()
const cardsController = require('../controllers/cardsController')
const authMiddleware = require('../middleware/authMiddleWare')
const adminMiddleware = require('../middleware/adminMiddleware')


//товары определенной категории и типа
router.get('/getall/categoryId/:categoryId([0-9]+)/typeId/:typeId([0-9]+)', cardsController.getAll)
//товары определенной категории
router.get('/getall/categoryId/:categoryId([0-9]+)', cardsController.getAll)
//товары определенного типа
router.get('/getall/typeId/:typeId([0-9]+)', cardsController.getAll)
//все товары каталога
router.get('/getall', cardsController.getAll)
//один товар каталога
router.get('/getone/:id([0-9]+)', cardsController.getOne)

//создать товар (ТОЛЬКО ДЛЯ АДМИНИСТРАТОРА)
router.post('/create',
//  authMiddleware, adminMiddleware,
 cardsController.create)

//удалить товар (ТОЛЬКО ДЛЯ АДМИНИСТРАТОРА)
router.delete('/delete/:id([0-9]+)',
//  authMiddleware, adminMiddleware,
 cardsController.delete)

module.exports = router