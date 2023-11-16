const User = require('../models/User.model')
const Match = require('../models/Match.model')


const renderUserProfile = (req, res, next) => {
    res.render('user/user-details', { user: req.session.currentUser, owner: true, organizer: req.session.currentUser.role === 'ORGANIZER' })

}

const renderUserDetails = (req, res, next) => {
    const { user_id } = req.params

    // Promise.all(
    //     [
    //         User.findById(user_id),
    //         Match.find({ assistants: user_id })
    //     ]
    // )
    User
        .findById(user_id)
        .then(user => res.render('user/user-details', { user, owner: req.session.currentUser._id === user_id, organizer: req.session.currentUser.role === 'ORGANIZER' }))
        .catch(err => next(err))
}

const renderEditUser = (req, res, next) => {
    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => res.render('user/edit-user', user))
        .catch(err => next(err))
}

const postEditUser = (req, res, next) => {
    const { user_id } = req.params
    const { username, email } = req.body

    User
        .findByIdAndUpdate(user_id, { username, email })
        .then(user => res.redirect(`/usuarios/detalles/${user_id}`))
        .catch(err => next(err))
}

const deleteUser = (req, res, next) => {
    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => res.redirect('/'))
        .catch(err => next(err))
}


module.exports = {
    renderUserProfile,
    renderUserDetails,
    renderEditUser,
    postEditUser,
    deleteUser
}