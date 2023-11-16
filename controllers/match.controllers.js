const Match = require('../models/Match.model')
const Field = require('../models/Field.model')
const { formatDate } = require('../utils/date-utils')
const { checkMatchAvailability, checkPlayerAssistence } = require('../utils/match-utils')


const renderCreateMatch = (req, res, next) => {
    const { field_id } = req.params

    Field
        .findById(field_id)
        .then(field => res.render('match/create-match', { field, date: formatDate(new Date()) }))
        .catch(err => next(err))
}

const postCreateMatch = (req, res, next) => {
    const { field_id: field} = req.params
    const { date } = req.body
    const matchDate = new Date(date)

    Match
        .find({ field })
        .then(matches => checkMatchAvailability(matches, matchDate))
        .then(isAvaliable => {
            console.log(isAvaliable)
            if (isAvaliable) {
                return Match.create({ date, field })
            }
            else {
                return
            }
        })
        .then(match => {
            if (match) {
                res.redirect(`/campos/detalles/${field}`)
            }
            else {
                return Field
                    .findById(field)
                    .then(field => res.render('match/create-match', { field, date: formatDate(new Date()), errorMessage: 'Hora ocupada' }))
                    .catch(err => next(err))
            }
        })
        .catch(err => next(err))
}

const renderMatchDetails = (req, res, next) => {
    const { match_id } = req.params

    Match
        .findById(match_id)
        .populate('field assistants')
        .then(match => res.render('match/match-details', { match, date: formatDate(new Date()) }))
        .catch(err => next(err))
}

const renderEditMatch = (req, res, next) => {
    const { match_id } = req.params

    Match
        .findById(match_id)
        .populate('field')
        .then(match => res.render('match/edit-match', { match, matchDate: formatDate(match.date), todayDate: formatDate(new Date()) }))
        .catch(err => next(err))
}

const postEditMatch =  (req, res, next) => {
    const { match_id } = req.params
    const { date } = req.body
    const matchDate = new Date(date)

    Match
        .findById(match_id)
        .then(match => Match.find({ field: match.field }))
        .then(matches => checkMatchAvailability(matches, matchDate))
        .then(isAvaliable => {
            if (isAvaliable) {
                return Match.findByIdAndUpdate(match_id, { date })
            }
            else {
                return
            }
        })
        .then(match => {
            if (match) {
                res.redirect(`/campos/detalles/${match.field}`)
            }
            else {
                return Match
                    .findById(match_id)
                    .then(() => res.redirect(`/partidos/editar/${match_id}`))
                    .catch(err => next(err))
            }
        })
        .catch(err => next(err))
}

const deleteMatch = (req, res, next) => {
    const { match_id } = req.params

    Match
        .findByIdAndDelete(match_id)
        .then(match => res.redirect(`/campos/detalles/${match.field}`))
        .catch(err => next(err))
}

const addPlayerToMatch = (req, res, next) => {
    const { match_id } = req.params
    const {currentUser: user} = req.session

    Match
        .findById(match_id)
        .then(match => {
            if (checkPlayerAssistence(match, user._id)) {
                return
            }
            else {
                return Match.findByIdAndUpdate(match_id, { $push: { assistants: user._id } })
            }
        })
        .then(match => {
            if (match) {
                res.redirect(`/partidos/detalles/${match._id}`)
            }
            else {
                res.redirect(`/partidos/detalles/${match._id}`)
            }
        })
        .catch(err => next(err))
}

const deletePlayerFromMatch = (req, res, next) => {
    const { match_id } = req.params
    const {currentUser: user} = req.session

    Match
        .findByIdAndUpdate(match_id, { $pull: { assistants: user._id } })
        .then(() => res.redirect(`/partidos/detalles/${match_id}`))
        .catch(err => next(err))      
}


module.exports = {
    renderCreateMatch,
    postCreateMatch,
    renderMatchDetails,
    renderEditMatch,
    postEditMatch,
    deleteMatch,
    addPlayerToMatch,
    deletePlayerFromMatch
}