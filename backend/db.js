
const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://ashutoshagnihotri003:AshuTwinkle@cluster0.4goin5b.mongodb.net/FinTech"

const connectToMongo = async () => {
try {
    mongoose.set('strictQuery', false)
    mongoose.connect(mongoURI) 
    console.log('Mongo connected')
}
catch(error) {
    console.log(error)
    process.exit()
}
}
module.exports = connectToMongo;