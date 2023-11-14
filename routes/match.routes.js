const express = require('express')
const router = express.Router()

const Match = require('../models/Match.model')
const Field = require('../models/Field.model')



router.get('/partidos/crear/:campo_id', (req, res, next) => {
    const { campo_id } = req.params

    Field
        .findById(campo_id)
        .then(field => res.render('match/create-match', field))
        .catch(err => next(err))

})



router.post('/partidos/crear/:field_id', (req, res, next) => {
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
                res.send({ errorMessage: 'Hora ocupada' })
            }
        })
})


router.get('/partidos/editar/:partido_id', (req, res, next) => {

    const { partido_id } = req.params


    Match
        .findById(partido_id)
        .populate('field')
        .then(match => res.render('match/edit-match', match))
        .catch(err => next(err))


})


router.post('/partidos/editar/:partido_id', (req, res, next) => {

    const { partido_id } = req.params
    const { date } = req.body

    Match
        .findByIdAndUpdate(partido_id, { date })
        .then(match => res.redirect(`/campos/detalles/${match.field}`,))
        .catch(err => next(err))

})

router.get('/partidos/borrar/:partido_id', (req, res, next) => {

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
                res.redirect('/mapa')
            }
            else {
                res.send({ errorMessage: 'Ya estas apuntado' })
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
