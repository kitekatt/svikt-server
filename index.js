require('dotenv').config()
const express = require('express')
const nodemailer = require('nodemailer')
const server = express()
const mapping = require('./models/models') //импорт моделей
const sequelize = require('./db')
const cors = require('cors')
const router = require('./routes/index')
const ErrorHandlingMiddleware = require('./middleware/ErrorHandlingMiddleware')
const fileupload = require('express-fileupload')
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 5000
const app = express()

app.use(cors({origin: 'http://localhost:3000', credentials: true}))
app.use(express.json()) //для работы с json
app.use(cookieParser(process.env.SECRET_KEY))
app.use(fileupload()) //для загрузки файлов
app.use(express.static('static')) //для загрузки статиков
app.use('/api', router) //все маршруты

app.use(ErrorHandlingMiddleware) //обработчик ошибок ошибок

//middleware, позволяющий оброщаться клиенту с одного сервера на другой без разрешения
//со стороны домена
const start = async () => {
   try{
      await sequelize.authenticate()
      await sequelize.sync()
      app.listen(PORT, () => console.log('Сервер запущен на порту', PORT))
   } catch(e){
      console.log(e)
   }
}

start()
