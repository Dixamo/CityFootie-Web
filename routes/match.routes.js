const express = require('express')
const router = express.Router()

const Match = require('../models/Match.model')
const Field = require('../models/Field.model')


router.get('/partidos/detalles/:partido_id', (req, res, next)=>{

    const {campo_id}=req.params

        Field
            .findById(campo_id)
            .then(field=>res.render('match/create-match', field))
            .catch(err => next(err))
})



router.get('/partidos/crear/:campo_id/', (req, res , next)=>{

    const { date, field, assistans }= req.body

    
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
    
  





module.exports = router
