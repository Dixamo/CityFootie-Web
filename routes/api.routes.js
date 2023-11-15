const express = require('express')
const router = express.Router()

const Fields = require('../models/Field.model')

router.get('/fields', (req, res, next) => {

    Fields
        .find()
        .then(fields => res.json(fields))
        .catch(err => res.status(500).json({ message: 'Server issue D:', errorDetails: err }))
})

module.exports = router
