const express = require('express')
const router = express.Router()

const { isLoggedIn, checkRoles } = require('../middleware/route.guard')
const {
    renderUserProfile,
    renderUserDetails,
    renderEditUser,
    postEditUser,
    deleteUser
} = require('../controllers/user.controllers')


router.get('/usuarios/perfil', isLoggedIn, renderUserProfile)

router.get('/usuarios/detalles/:user_id', isLoggedIn, renderUserDetails)

router.get('/usuarios/editar/:user_id', isLoggedIn, checkRoles(true, 'ORGANIZER'), renderEditUser)

router.post('/usuarios/editar/:user_id', isLoggedIn, checkRoles(true, 'ORGANIZER'), postEditUser)

router.post('/usuarios/borrar/:user_id', isLoggedIn, checkRoles(false, 'ORGANIZER'), deleteUser)


module.exports = router