const mongoose = require('mongoose')

const url = process.env.MONGO_DB_URL
const database = process.env.MONGO_DB_NAME

mongoose.Promise = global.Promise

const connectWithRetry = ()=> {
  console.log('MongoDB connection with retry')
  return mongoose.connect(url + '/' + database)
}

mongoose.connect(url + '/' + database).catch((error)=> {
    console.log(error)
})

mongoose.connection.on('error', (error)=> {
    console.log(`MongoDB connection error: ${error}`)
    setTimeout(connectWithRetry, 5000)
})

module.exports = mongoose
