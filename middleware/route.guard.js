const isLoggedIn = (req, res, next) => {
    if (req.session.currentUser) {
        next()
    }
    else {
        res.redirect('/iniciar-sesion')
    }
}

const isLoggedOut = (req, res, next) => {
    if (!req.session.currentUser) {
        next()
    }
    else {
        res.redirect('/')
    }
}


const checkRole = (...adimetteRoles) => (req, res, next) => {

    const { role } = req.session.currentUser

    if (adimetteRoles.includes(role)) {
        next()
    } else {
        res.redirect('/')
    }
}


const checkMySession = (...isMySession) => (req, res, next) => {

    const { _id } = req.params
    const { role } = req.session.currentUser


    if (req.session.currentUser._id === _id || isMySession.includes(role)) {
        next()
    } else {
        res.redirect('/')
    }
}




module.exports = {
    isLoggedIn,
    isLoggedOut,
    checkMySession,
    checkRole
}