const UserModel = require("../models/UserModel")

const ApiError = require("../error/ApiError")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

//работа с jwt-токеном
const makeJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}
class UserController {
    async signup(req, res, next) {
        const {email, password, role = 'USER'} = req.body
        try {
            if (!email || !password) {
                throw new Error('Пустой email или пароль')
            }
            if (role !== 'USER') {
                throw new Error('Возможна только роль USER')
            }
            const hash = await bcrypt.hash(password, 5)
            const user = await UserModel.create({email, password: hash, role})
            const token = makeJwt(user.id, user.email, user.role)
            return res.json({token})
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const user = await UserModel.getByEmail(email)
            let compare = bcrypt.compareSync(password, user.password)
            if (!compare) {
                throw new Error('Указан неверный пароль')
            }
            const token = makeJwt(user.id, user.email, user.role)
            return res.json({token})
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async check(req, res, next) {
        const token = makeJwt(req.auth.id, req.auth.email, req.auth.role)
        return res.json({token})
    }
    async getAll(req, res, next) {
        try {
            const users = await UserModel.getAll()
            res.json(users)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id пользователя')
            }
            const user = await UserModel.getOne(req.params.id)
            res.json(user)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async create(req, res, next) {
        const {email, password, role = 'USER'} = req.body
        try {
            if (!email || !password) {
                throw new Error('Пустой email или пароль')
            }
            if ( ! ['USER', 'ADMIN'].includes(role)) {
                throw new Error('Недопустимое значение роли')
            }

            const hash = await bcrypt.hash(password, 5)
            const user = await UserModel.create({email, password: hash, role})
            return res.json(user)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }
}
module.exports = new UserController()