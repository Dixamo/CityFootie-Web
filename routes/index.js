module.exports = app => {

    const indexRoutes = require("./index.routes")
    app.use("/", indexRoutes)

    const authRoutes = require("./auth.routes")
    app.use("/", authRoutes)

    const fieldsRoutes = require('./fields.routes')
    app.use('/', fieldsRoutes)    

    // const apiRoutes = require('./api.routes')
    // app.use('/api', apiRoutes)
}