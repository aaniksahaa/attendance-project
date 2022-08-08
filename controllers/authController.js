const Teacher = require('../models/Teacher')
const Classdate = require('../models/Classdate')
const Variable = require('../models/Variable')

exports.teacherSignupGet = (req,res,next) => {
    let title = "Teacher Sign Up"
    res.render('pages/teacherSignup.ejs', { title })
}

exports.teacherSignupPost = (req,res,next) => {
    let title = "Teacher Sign Up";
    let { name, imageurl, secretkey, password } = req.body

    let teacher = new Teacher({
        name,
        imageurl,
        secretkey,
        password
    })

    teacher.save()
        .then(() => {
            res.render('pages/teacherSignup.ejs', { title })
        })
        .catch(e => {
            console.log(e)
        })
}

exports.userSignupGet = (req,res,next) => {
    let title = "User Sign Up"
    res.render('pages/userSignup.ejs', { title })
}

exports.userSignupPost = (req,res,next) => {

    let title = "User Sign Up";
    let { secretkey, password } = req.body

    let user = new User({
        secretkey,
        password
    })

    user.save()
        .then(() => {
            res.render('pages/userSignup.ejs', { title })
        })
        .catch(e => {
            console.log(e)
        })
}

exports.userLoginGet = (req,res,next) => {
    let title = "User Login"
    let alertMsg = "."
    
    res.render('pages/userLogin.ejs', { title, alertMsg })
}

exports.userLoginPost = async (req,res,next) => {
    let title = "User Login";
    let { secretkey, password } = req.body

    try{

        let loginuser = await User.findOne({ secretkey })
        let sv = await Variable.findOne({"name" : "postCount"})
        let nowCount = sv.value
        let alertMsg = "Invalid Credentials"

        if(!loginuser)
        {
            res.render('pages/userLogin.ejs',{ title, alertMsg })
        }

        let match = false
        if(password==loginuser.password){
            match = true
        }

        if(!match)
        {
            res.render('pages/userLogin.ejs',{ title, alertMsg })
        }

        req.session.isLoggedInUser = true
        req.session.isLoggedInTeacher = false
        req.session.visitCount = 0
        req.session.roll = secretkey

        res.redirect('/user/notices')
    
    } catch(e){
        console.log(e)
        next(e)
    }

}

exports.teacherLoginGet = (req,res,next) => {
    let title = "Teacher Login"
    let alertMsg = "."
    res.render('pages/teacherLogin.ejs', { title, alertMsg })
}

exports.teacherLoginPost = async (req,res,next) => {
    let title = "Teacher Login";
    let alertMsg = "Invalid Credentials"

    let { secretkey, password } = req.body

    try{

        let loginteacher = await Teacher.findOne({ secretkey })


        if(!loginteacher)
        {
            res.render('pages/teacherLogin.ejs',{ title, alertMsg })
        }

        let match = false
        if(password==loginteacher.password){
            match = true
        }

        if(!match)
        {
            res.render('pages/teacherLogin.ejs',{ title, alertMsg })
        }

        req.session.isLoggedInUser = false
        req.session.isLoggedInTeacher = true
        req.session.visitCount = 0

        console.log('Okay Now Redirecting ...')
        res.redirect('/teacher/dashboard')

    } catch(e){
        console.log(e)
        next(e)
    }
}

exports.logout = (req,res,next) => {
    req.session.destroy(err => {
        if(err){
            console.log(err)
            return next(err)
        }
        return res.redirect('/auth/common')
    })
}
