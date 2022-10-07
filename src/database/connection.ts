import mongoose from 'mongoose'
require('dotenv').config()

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.nupqyqp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
console.log("Connection with database established")