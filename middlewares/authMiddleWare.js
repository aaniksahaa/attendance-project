exports.isAuthenticatedUser = (req, res, next) => {
    if(!req.session.isLoggedInUser) {
        return res.redirect('/auth/common')
    }
    next()
}

exports.isAuthenticatedTeacher = (req, res, next) => {
    if(!req.session.isLoggedInTeacher) {
        return res.redirect('/auth/common')
    }
    next()
}

exports.isUnAuthenticatedUser = (req, res, next) => {
    if(req.session.isLoggedInUser) {
        return res.redirect('/user/notices')
    }
    next()
}

exports.isUnAuthenticatedTeacher = (req, res, next) => {
    if(req.session.isLoggedInTeacher) {
        return res.redirect('/teacher/dashboard')
    }
    next()
}