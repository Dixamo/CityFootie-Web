const express = require('express')
const User = require('../models/User.model')
const Match = require('../models/Match.model')
const router = express.Router()

const { isLoggedIn, checkRoles } = require('../middleware/route.guard')

router.get('/usuarios/perfil', isLoggedIn, (req, res, next) => {
    res.render('user/user-details', { user: req.session.currentUser, owner: true })
})

router.get('/usuarios/detalles/:user_id', isLoggedIn, (req, res, next) => {
    const { user_id } = req.params

    // Promise.all(
    //     [
    //         User.findById(user_id),
    //         Match.find({ assistants: user_id })
    //     ]
    // )
    User
        .findById(user_id)
        .then(user => res.render('user/user-details', { user, owner: req.session.currentUser._id === user_id }))
        .catch(err => next(err))
})

router.get('/usuarios/editar/:user_id', isLoggedIn, checkRoles(true, 'ORGANIZER'), (req, res, next) => {
    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => res.render('user/edit-user', user))
        .catch(err => next(err))
})

router.post('/usuarios/editar/:user_id', isLoggedIn, checkRoles(true, 'ORGANIZER'), (req, res, next) => {
    const { user_id } = req.params
    const { username, email } = req.body

    User
        .findByIdAndUpdate(user_id, { username, email })
        .then(user => res.redirect(`/usuarios/detalles/${user_id}`))
        .catch(err => next(err))
})

router.post('/usuarios/borrar/:user_id', isLoggedIn, checkRoles(true, 'ORGANIZER'), (req, res, next) => {
    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => res.redirect('/'))
        .catch(err => next(err))
})

module.exports = router