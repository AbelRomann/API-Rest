const mongoose = require('mongoose')

const host = '127.0.0.1'
const port = '27017'
const database = 'cursos'

const uri = `mongodb://${host}:${port}/${database}`

mongoose.connect(uri)