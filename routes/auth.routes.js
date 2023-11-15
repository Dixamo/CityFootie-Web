const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')
const User = require('../models/User.model')
const saltRounds = 10


const claudinary = require('../middleware/photo.profile.guard')

const { isLoggedOut } = require('../middleware/route.guard')

router.get('/registrarse', isLoggedOut, (req, res, next) => {
    res.render('auth/signup')
})

router.post('/registrarse', isLoggedOut, claudinary.single('cover'), (req, res, next) => {

    const { path: cover } = req.file ? req.file : '../public/images/imgpre.png'
    const { username, email, plainPassword } = req.body

    console.log(req.file.path)
    // req.file
    // if (path === undefined) {
    //     return cover = '../public/images/imgpre.png'
    // }

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(plainPassword, salt))
        .then(passwordHash => User.create({ username, email, cover, password: passwordHash }))
        .then(() => res.redirect('/iniciar-sesion'))
})

router.get('/iniciar-sesion', isLoggedOut, (req, res, next) => {
    res.render('auth/login')
})

router.post('/iniciar-sesion', isLoggedOut, (req, res, next) => {
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
})

router.get('/cerrar-sesion', (req, res, next) => {
    req.session.destroy(() => res.redirect('/'))
})


module.exports = router