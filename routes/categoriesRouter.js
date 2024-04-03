const express = require('express')
const router = new express.Router()
const categoriesController = require('../controllers/categoriesController')
// const authMiddleware = require('../middleware/authMiddleWare')
// const adminMiddleware = require('../middleware/adminMiddleware')

router.get('/getall', categoriesController.getAll)
router.get('/getone/:id([0-9]+)', categoriesController.getOne)
//ТОЛЬКО ДЛЯ АДМИНИСТРАТОРА
router.post('/create', 
// authMiddleware, adminMiddleware, 
categoriesController.create)

router.put('/update/:id([0-9]+)', 
// authMiddleware, adminMiddleware, 
categoriesController.update)

router.delete('/delete/:id([0-9]+)', 
// authMiddleware, adminMiddleware, 
categoriesController.delete)

module.exports = router