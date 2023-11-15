const express = require('express')
const router = express.Router()

const Match = require('../models/Match.model')
const Field = require('../models/Field.model')

const { isLoggedIn, checkRoles } = require('../middleware/route.guard')

const { formatDate } = require('../utils/index')

router.get('/partidos/crear/:field_id', isLoggedIn, checkRoles(false, 'ADMIN', 'ORGANICER'), (req, res, next) => {
    const { field_id } = req.params

    Field
        .findById(field_id)
        .then(field => res.render('match/create-match', { field, date: formatDate(new Date()) }))
        .catch(err => next(err))
})

router.post('/partidos/crear/:field_id', isLoggedIn, checkRoles(false, 'ADMIN', 'ORGANICER'), (req, res, next) => {
    const { field_id } = req.params
    const { date } = req.body
    const matchDate = new Date(date)

    Match
        .find({ field: field_id })
        .then(matches => {
            let isAvaliable = true
            matches.forEach(match => {
                if (match.date.getTime() == matchDate.getTime()) {
                    isAvaliable = false
                }
            })
            return isAvaliable
        })
        .then(isAvaliable => {
            if (isAvaliable) {
                return Match.create({ date, field: field_id })
            }
            else {
                return
            }
        })
        .then(match => {
            if (match) {
                res.redirect(`/campos/detalles/${field_id}`)
            }
            else {
                return Field
                    .findById(field_id)
                    .then(field => res.render('match/create-match', { field, date: formatDate(new Date()), errorMessage: 'Hora ocupada' }))
                    .catch(err => next(err))
            }
        })
        .catch(err => next(err))
})

router.get('/partidos/detalles/:match_id', isLoggedIn, (req, res, next) => {
    const { match_id } = req.params

    Match
        .findById(match_id)
        .populate('field')
        .populate('assistants')
        .then(match => res.render('match/match-details', { match, date: formatDate(new Date()) }))
        .catch(err => next(err))
})

router.get('/partidos/editar/:match_id', isLoggedIn, checkRoles(false, 'ADMIN', 'ORGANICER'), (req, res, next) => {
    const { match_id } = req.params

    Match
        .findById(match_id)
        .populate('field')
        .then(match => res.render('match/edit-match', { match, matchDate: formatDate(match.date), todayDate: formatDate(new Date()) }))
        .catch(err => next(err))
})


router.post('/partidos/editar/:match_id', isLoggedIn, checkRoles(false, 'ADMIN', 'ORGANICER'), (req, res, next) => {
    const { match_id } = req.params
    const { date } = req.body
    const matchDate = new Date(date)

    Match
        .findById(match_id)
        .then(match => {
            return Match.find({ field: match.field })
        })
        .then(matches => {
            console.log(matches)
            let isAvaliable = true
            matches.forEach(match => {
                if (match.date.getTime() == matchDate.getTime()) {
                    isAvaliable = false
                }
            })
            return isAvaliable
        })
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
})

router.get('/partidos/borrar/:partido_id', isLoggedIn, checkRoles(false, 'ADMIN', 'ORGANICER'), (req, res, next) => {
    const { partido_id } = req.params

    Match
        .findByIdAndDelete(partido_id)
        .then(match => res.redirect(`/campos/detalles/${match.field}`))
        .catch(err => next(err))
})

router.post('/partidos/anadir/:match_id', (req, res, next) => {
    const { match_id } = req.params
    const user = req.session.currentUser

    Match
        .findById(match_id)
        .then(match => {
            if (match.assistants.includes(user._id)) {
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
                res.send({ errorMessage: 'Ya estas apuntado' }) //haz estoooooooooooo
            }
        })
})

router.post('/partidos/quitar/:match_id', (req, res, next) => {
    const { match_id } = req.params
    const user = req.session.currentUser

    Match
        .findByIdAndUpdate(match_id, { $pull: { assistants: user._id } })
        .then(() => res.redirect('/mapa'))
})




// router.get('/detalles/:book_id', (req, res) => {

//     const { book_id } = req.params

//     Book
//         .findById(book_id)
//         .populate('author')             // nombre del campo a popular
//         .then(book => res.render('books/details', book))
//         .catch(err => console.log(err))
// })





// date:  type: Date,
//         require: true

// field:  type: Schema.Types.ObjectId,
//         ref: 'Field'

// assistants:    type: Schema.Types.ObjectId,
//         ref: 'User'

// router.get('/campos/detalles/:campo_id', (req, res, next) => {
//     const { campo_id } = req.params

//     Promise.all(
//         [
//             Field.findById(campo_id),
//             Match.find({ field: campo_id })
//         ]
//     )
//         .then(values => {
//             res.render('fields/field-detail', { field: values[0], matches: values[1] })
//         })
//         .catch(err => next(err))
// })






module.exports = router
