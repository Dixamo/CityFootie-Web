module.exports = app => {


    const indexRoutes = require("./routes/index.routes")
    app.use("/", indexRoutes)


}