const authRouter = require('express').Router()

const { isAuthenticatedUser, isAuthenticatedTeacher, isUnAuthenticatedUser, isUnAuthenticatedTeacher } = require('../middlewares/authMiddleWare')


const {
    teacherSignupGet,
    teacherSignupPost,
    userSignupGet,
    userSignupPost,
    userLoginGet,
    userLoginPost,
    teacherLoginGet,
    teacherLoginPost,
    logout
} = require('../controllers/authController')

authRouter.get('/credentialsTeacherSignup', teacherSignupGet)
authRouter.post('/credentialsTeacherSignup', teacherSignupPost)
authRouter.get('/credentialsUserSignup', userSignupGet)
authRouter.post('/credentialsUserSignup', userSignupPost)
authRouter.get('/userLogin', isUnAuthenticatedUser, userLoginGet)
authRouter.post('/userLogin', userLoginPost)
authRouter.get('/teacherLogin', isUnAuthenticatedTeacher, teacherLoginGet)
authRouter.post('/teacherLogin', teacherLoginPost)
authRouter.get('/logout', logout)

authRouter.get('/', userLoginGet) 

module.exports = authRouter
