const express = require('express')
const router = express.Router()


const claudinary = require('../middleware/photo.profile.guard')

const { isLoggedOut } = require('../middleware/route.guard')

const {
    renderCreateUser,
    postCreateUser,
    renderLogin,
    postLogin,
    destroyLogin
} = require('../controllers/auth.controllers')


router.get('/registrarse', isLoggedOut, renderCreateUser)

router.post('/registrarse', isLoggedOut, claudinary.single('cover'), postCreateUser)

router.get('/iniciar-sesion', isLoggedOut, renderLogin)

router.post('/iniciar-sesion', isLoggedOut, postLogin)

router.get('/cerrar-sesion', destroyLogin)


module.exports = router