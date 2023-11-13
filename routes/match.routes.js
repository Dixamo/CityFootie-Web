const express = require('express')
const router = express.Router()

const Match = require('../models/Match.model')
const Field = require('../models/Field.model')






router.get('/campos/detalles/:campo_id/crear', (req, res, next) => {

    const { campo_id } = req.params

    Field
        .findById(campo_id)
        .then(field => res.render('match/create-match', field))
        .catch(err => next(err))

})



// router.post('campos/detalles/:campo_id/crear', (req, res, next) => {
//     const { campo_id: field } = req.params
//     const { date } = req.body

//     Match
//         .create({ date, field })
//         .then(details => res.redirect('/campos/detalles/', details))
//         .catch(err => next(err))
// })

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







module.exports = router
