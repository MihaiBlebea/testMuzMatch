const mongoose = require('mongoose')

const url = process.env.MONGO_DB_URL
const database = process.env.MONGO_DB_NAME
console.log(url, database)
// Setup
mongoose.Promise = global.Promise

mongoose.connect(url + '/' + database).catch((error)=> {
    console.log(error)
})

module.exports = mongoose
