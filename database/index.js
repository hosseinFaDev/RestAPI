const mongoose = require('mongoose');
const { MONGO_HOST, MONGO_DBNAME, MONGO_PORT } = process.env;

mongoose.connection.on('error', (error) => {
    console.log('faild to connect to mongoDB', error.message)
})
const startMongoDB = () => {
    mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DBNAME}`)


}
module.exports = {
    startMongoDB

}