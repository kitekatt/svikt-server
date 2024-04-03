const ApiError = require("../error/ApiError")

const admin = (req, res, next) => {
   try {
       if (req.auth.role !== 'ADMIN') {
           throw new Error('Только для администратора')
       }
       next()
   } catch (e) {
       next(ApiError.forbidden(e.message))
   }
}

module.exports = admin