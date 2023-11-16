const Field = require('../models/Field.model')
const Match = require('../models/Match.model')


const renderMap = (req, res, next) => {
    res.render('fields/maps')
}

const renderDetailField = (req, res, next) => {
    const { field_id } = req.params

    Promise.all(
        [
            Field.findById(field_id),
            Match.find({ field: field_id })
        ]
    )
        .then(([field, matches]) => res.render('fields/field-details', { field, matches }))
        .catch(err => next(err))
}

const renderCreateField = (req, res, next) => {
    res.render('fields/create-field')
}

const postCreateField = (req, res, next) => {
    const { name, latitude, longitude } = req.body
    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    Field
        .create({ name, location })
        .then(() => res.redirect('/mapa'))
        .catch(err => next(err))
}

const renderEditField = (req, res, next) => {
    const { field_id } = req.params

    Field
        .findById(field_id)
        .then(field => res.render('fields/edit-field', field))
        .catch(err => next(err))
}

const postEditField = (req, res, next) => {
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
}

const deleteField = (req, res, next) => {
    const { field_id } = req.params

    Field
        .findByIdAndDelete(field_id)
        .then(() => res.redirect('/mapa'))
        .catch(err => next(err))
}


module.exports = {
    renderMap,
    renderDetailField,
    renderCreateField,
    postCreateField,
    renderEditField,
    postEditField,
    deleteField
}