const express = require('express')
const router = new express.Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleWare')
const adminMiddleware = require('../middleware/adminMiddleware')

router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.get('/check', authMiddleware, userController.check)

//ТОЛЬКО ДЛЯ АДМИНИСТРАТОРА
router.get('/getall',
 authMiddleware, adminMiddleware, 
 userController.getAll)

router.get('/getone/:id([0-9]+)', 
authMiddleware, adminMiddleware, 
userController.getOne)

router.post('/create',
 authMiddleware, adminMiddleware, 
 userController.create)

module.exports = router