const express = require('express')
const router = express.Router()

const { isLoggedIn, checkRoles } = require('../middleware/route.guard')

const {
    renderMap,
    renderDetailField,
    renderCreateField,
    postCreateField,
    renderEditField,
    postEditField,
    deleteField
} = require('../controllers/fields.controllers')


router.get('/mapa', isLoggedIn, renderMap)

router.get('/campos/detalles/:field_id', isLoggedIn, renderDetailField)

router.get('/campos/crear', isLoggedIn, checkRoles(false, 'ORGANIZER'), renderCreateField)

router.post('/campos/crear', isLoggedIn, checkRoles(false, 'ORGANIZER'), postCreateField)

router.get('/campos/editar/:field_id', isLoggedIn, checkRoles(false, 'ORGANIZER'), renderEditField)

router.post('/campos/editar/:field_id', isLoggedIn, checkRoles(false, 'ORGANIZER'), postEditField)

router.post('/campos/borrar/:field_id', isLoggedIn, checkRoles(false, 'ORGANIZER'), deleteField)


module.exports = router