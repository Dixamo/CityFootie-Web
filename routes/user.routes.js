const express = require('express')
const User = require('../models/User.model')
const Match = require('../models/Match.model')
const router = express.Router()

const photoClaudinary = require('../middleware/photo.perfil.guard')


router.get('/usuarios/perfil', (req, res, next) => {
    res.render('user/user-details', { user: req.session.currentUser })
})

router.get('/usuarios/detalles/:user_id', (req, res, next) => {
    const { user_id } = req.params

    // Promise.all(
    //     [
    //         User.findById(user_id),
    //         Match.find({ assistants: user_id })
    //     ]
    // )
    User
        .findById(user_id)
        .then(user => res.render('user/user-details', { user }))
        .catch(err => next(err))
})

router.get('/usuarios/editar/:user_id', photoClaudinary.single('cover'), (req, res, next) => {
    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => res.render('user/edit-user', user))
        .catch(err => next(err))
})

router.post('/usuarios/editar/:user_id', (req, res, next) => {
    const { user_id } = req.params
    const { username, email, plainPassword } = req.body

    User
        .findByIdAndUpdate(user_id, { username, email, plainPassword })
        .then(user => res.redirect(`/usuarios/detalles/${user_id}`))
        .catch(err => next(err))
})

router.post('/usuarios/borrar/:user_id', (req, res, next) => {
    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => res.redirect('/'))
        .catch(err => next(err))
})

module.exports = router