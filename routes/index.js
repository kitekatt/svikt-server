//основной роутинг
const Router = require('express')
const router = new Router()
const cardsRouter = require('./cardsRouter')
const categoriesRouter = require('./categoriesRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')

router.use('/user', userRouter)
router.use('/category', categoriesRouter)
router.use('/type', typeRouter)
router.use('/card', cardsRouter)

module.exports = router