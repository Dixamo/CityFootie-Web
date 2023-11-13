const express = require('express')
const router = express.Router()

router.get('/usuarios/perfil', (req, res, next) => {
    res.render('user/user-details', { user: req.session.currentUser })
})


module.exports = router