require('./db/connect')
const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const connectDB = require('./db/connect')
require('dotenv').config()
app.use(express.json())
const port = 3000
app.use(express.static('./public'))
const start = async() => {
    
    try{
    await connectDB(process.env.MONGO_URI)
    app.listen(port,()=>{
        console.log(`Listening to port ${port}....`)
    })} catch(error){
        console.log(error)
    }
}


app.use('/api/v1/tasks',tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)
start()

