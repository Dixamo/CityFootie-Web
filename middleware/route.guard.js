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

module.exports = {
    isLoggedIn,
    isLoggedOut
}