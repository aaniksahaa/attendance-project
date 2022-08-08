const teacherDashboardRouter = require('express').Router()

const { isAuthenticatedUser, isAuthenticatedTeacher, isUnAuthenticatedUser, isUnAuthenticatedTeacher } = require('../middlewares/authMiddleWare')

const {
    getPage,
    checkAttendance,
    saveToDb
} = require('../controllers/teacherDashboardController')

teacherDashboardRouter.get('/', isAuthenticatedTeacher, getPage)
teacherDashboardRouter.post('/', isAuthenticatedTeacher, checkAttendance)
teacherDashboardRouter.post('/submitData', isAuthenticatedTeacher, saveToDb)

module.exports = teacherDashboardRouter