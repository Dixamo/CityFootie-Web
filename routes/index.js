module.exports = app => {

    const indexRoutes = require("./index.routes")
    app.use("/", indexRoutes)

    const userRoutes = require('./user.routes')
    app.use('/', userRoutes)

    const authRoutes = require("./auth.routes")
    app.use("/", authRoutes)

    const fieldsRoutes = require('./fields.routes')
    app.use('/', fieldsRoutes)

    const matchRoutes = require('./match.routes')
    app.use('/', matchRoutes)

    const apiRoutes = require('./api.routes')
    app.use('/api', apiRoutes)

}