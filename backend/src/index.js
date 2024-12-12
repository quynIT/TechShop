const express = require("express");
const dotenv = require('dotenv');
const { default: mongoose } = require("mongoose");
dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.get('/', (req, res) => {
    res.send('Hello world 2')
})

mongoose.connect(`mongodb+srv://datg:${process.env.MONGO_DB}@project1.sh0u5.mongodb.net/?retryWrites=true&w=majority&appName=Project1`)
.then(() => {
    console.log('Connect DB success!')
})
.catch((err) => {
    console.log(err)
})

app.listen(port, () => {
    console.log('Server is running in port: ' + port)
})