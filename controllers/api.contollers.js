const Fields = require('../models/Field.model')


const getFieldsFromApi = (req, res, next) => {

    Fields
        .find()
        .then(fields => res.json(fields))
        .catch(err => res.status(500).json({ message: 'Server issue D:', errorDetails: err }))
}


module.exports = {
    getFieldsFromApi,
}