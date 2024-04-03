const express = require('express')
const router = new express.Router()
const typeController = require('../controllers/typeController')
const authMiddleware = require('../middleware/authMiddleWare')
const adminMiddleware = require('../middleware/adminMiddleware')

router.get('/getall', typeController.getAll)
router.get('/getone/:id([0-9]+)', typeController.getOne)
//ТОЛЬКО ДЛЯ АДМИНИСТРАТОРА
router.post('/create', 
// authMiddleware, adminMiddleware, 
typeController.create)

router.put('/update/:id([0-9]+)', 
// authMiddleware, adminMiddleware, 
typeController.update)

router.delete('/delete/:id([0-9]+)', 
// authMiddleware, adminMiddleware, 
typeController.delete)

module.exports = router