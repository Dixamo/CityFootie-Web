const express = require('express')
const router = express.Router()
const { isLoggedIn, checkRoles } = require('../middleware/route.guard')
const { 
    renderCreateMatch,
    postCreateMatch,
    renderMatchDetails,
    renderEditMatch,
    postEditMatch,
    deleteMatch,
    addPlayerToMatch,
    deletePlayerFromMatch
} = require('../controllers/match.controllers')


router.get('/partidos/crear/:field_id', isLoggedIn, checkRoles(false, 'ADMIN', 'ORGANIZER'), renderCreateMatch)

router.post('/partidos/crear/:field_id', isLoggedIn, checkRoles(false, 'ADMIN', 'ORGANIZER'), postCreateMatch)

router.get('/partidos/detalles/:match_id', isLoggedIn, renderMatchDetails)

router.get('/partidos/editar/:match_id', isLoggedIn, checkRoles(false, 'ADMIN', 'ORGANIZER'), renderEditMatch)

router.post('/partidos/editar/:match_id', isLoggedIn, checkRoles(false, 'ADMIN', 'ORGANIZER'), postEditMatch)

router.get('/partidos/borrar/:match_id', isLoggedIn, checkRoles(false, 'ADMIN', 'ORGANIZER'), deleteMatch)

router.post('/partidos/anadir/:match_id', addPlayerToMatch)

router.post('/partidos/quitar/:match_id', deletePlayerFromMatch)


module.exports = router