const express = require('express')
const router = express.Router()

const Field = require('../models/Field.model')
const Match = require('../models/Match.model')

const { isLoggedIn, checkRoles } = require('../middleware/route.guard')

router.get('/mapa', isLoggedIn, (req, res, next) => {
    res.render('fields/maps')
})

router.get('/campos/detalles/:field_id', isLoggedIn, (req, res, next) => {
    const { field_id } = req.params

    Promise.all(
        [
            Field.findById(field_id),
            Match.find({ field: field_id })
        ]
    )
    .then(values => {
        res.render('fields/field-details', { field: values[0], matches: values[1] })
    })
    .catch(err => next(err))
})

router.get('/campos/crear', isLoggedIn, checkRoles(false, 'ORGANICER'), (req, res, next) => {
    res.render('fields/create-field')
})

router.post('/campos/crear', isLoggedIn, checkRoles(false, 'ORGANICER'), (req, res, next) => {
    const { name, latitude, longitude } = req.body
    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    Field
        .create({ name, location })
        .then(() => res.redirect('/mapa'))
        .catch(err => next(err))
})

router.get('/campos/editar/:field_id', isLoggedIn, checkRoles(false, 'ORGANICER'), (req, res, next) => {
    const { field_id } = req.params

    Field
        .findById(field_id)
        .then(field => res.render('fields/edit-field', field))
        .catch(err => next(err))
})

router.post('/campos/editar/:field_id', isLoggedIn, checkRoles(false, 'ORGANICER'), (req, res, next) => {
    const { field_id } = req.params
    const { name, latitude, longitude } = req.body
    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    Field
        .findByIdAndUpdate(field_id, { name, location })
        .then(field => res.redirect('/mapa'))
        .catch(err => next(err))
})

router.post('/campos/borrar/:field_id', isLoggedIn, checkRoles(false, 'ORGANICER'), (req, res, next) => {
    const { field_id } = req.params

    Field
        .findByIdAndDelete(field_id)
        .then(() => res.redirect('/mapa'))
        .catch(err => next(err))
})

module.exports = router