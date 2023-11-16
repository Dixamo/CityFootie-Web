const User = require('../models/User.model')
const bcrypt = require('bcryptjs')
const saltRounds = 10


const renderCreateUser = (req, res, next) => {
    res.render('auth/signup')
}

const postCreateUser = (req, res, next) => {
    const { path: cover } = req.file ? req.file : '../public/images/imgpre.png'
    const { username, email, plainPassword } = req.body

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(plainPassword, salt))
        .then(passwordHash => User.create({ username, email, cover, password: passwordHash }))
        .then(() => res.redirect('/iniciar-sesion'))
}

const renderLogin = (req, res, next) => {
    res.render('auth/login')
}

const postLogin = (req, res, next) => {
    const { email, password } = req.body

    if (email.length === 0 || password.length === 0) {
        res.render('auth/login', { errorMesage: 'Relleno todos los campos' })
    }

    User
        .findOne({ email })
        .then(foundUser => {
            if (!foundUser) {
                res.render('auth/loging', { errorMesage: 'Email no registrado' })
            }

            if (bcrypt.compareSync(password, foundUser.password) === false) {
                res.render('auth/loging', { errorMesage: 'Contraseña incorrecta' })
            }

            req.session.currentUser = foundUser
            res.redirect('/mapa')
        })
        .catch(err => next(err))
}

const destroyLogin = (req, res, next) => {
    req.session.destroy(() => res.redirect('/'))
}


module.exports = {
    renderCreateUser,
    postCreateUser,
    renderLogin,
    postLogin,
    destroyLogin,
}