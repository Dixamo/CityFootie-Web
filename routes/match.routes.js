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



router.post('/partidos/crear/:campo_id', (req, res, next) => {
    const { campo_id: field } = req.params
    const { date } = req.body


    Match

        .create({ date, field })
        .then(() => res.redirect(`/campos/detalles/${field}`))
        .catch(err => next(err))
})


router.get('/partidos/editar/:partido_id', (req, res, next) => {

    const { partido_id } = req.params
    const { date } = req.body

    Match
        .findById(partido_id)
        .populate('field')
        .then(match => res.render('match/edit-match', match))
        .catch(err => next(err))


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

router.get('/campos/detalles/:campo_id', (req, res, next) => {
    const { campo_id } = req.params

    Promise.all(
        [
            Field.findById(campo_id),
            Match.find({ field: campo_id })
        ]
    )
        .then(values => {
            res.render('fields/field-detail', { field: values[0], matches: values[1] })
        })
        .catch(err => next(err))
})






module.exports = router
