const userNoticesRouter = require('express').Router()

const { isAuthenticatedUser, isAuthenticatedTeacher, isUnAuthenticatedUser, isUnAuthenticatedTeacher } = require('../middlewares/authMiddleWare')

const {
    getAllNotices, 
    getSingleNotice
} = require('../controllers/userNoticesController')

userNoticesRouter.get('/', isAuthenticatedUser, getAllNotices)
userNoticesRouter.get('/:id', isAuthenticatedUser, getSingleNotice)

module.exports = userNoticesRouter