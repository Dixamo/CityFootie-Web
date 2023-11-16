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
        res.redirect('/mapa')
    }
}

const checkRoles = (allowOwner, ...admittedRoles) => (req, res, next) => {
    const { user_id } = req.params
    const { role } = req.session.currentUser

    if (allowOwner) {
        if (user_id === req.session.currentUser._id || admittedRoles.includes(role)) {
            next()
        }
        else {
            res.redirect('/')
        }
    }
    else {
        if (admittedRoles.includes(role)) {
            next()
        }
        else {
            res.redirect('/iniciar-sesion')
        }
    }
}

const loggedUser = (req, res, next) => {
    const response = {}
    response.logged = req.session && req.session.currentUser
    res.locals.response = response
    next()
}

module.exports = {
    isLoggedIn,
    isLoggedOut,
    checkRoles,
    loggedUser
}