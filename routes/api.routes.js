const express = require('express')
const router = express.Router()
const { getFieldsFromApi } = require('../controllers/api.contollers')


router.get('/fields', getFieldsFromApi)


module.exports = router
