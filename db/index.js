const mongoose = require("mongoose")


const MONGO_URI =
  process.env.MONGODB_URI || "mongodb+srv://juanda:l0yEbA5E6djJrc1X@cityfootie.lfzswgj.mongodb.net/cityfootie?retryWrites=true&w=majority"

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    const databaseName = x.connections[0].name
    console.log(`Connected to Mongo! Database name: "${databaseName}"`)
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err)
  })
