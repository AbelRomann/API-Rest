const mongoose = require('mongoose')

const cursosSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    lenguaje: {
        type: String,
        trim: true,
        default: undefined

    },
    tema: {
        type: String,
        trim:true,
        default: undefined
    },
    vistas: {
        type: Number,
        required: true,
        trim: true
    },
    nivel: {
        type: String,
        required: true,
        trim: true
    }
})



const Cursos = mongoose.model('Cursos', cursosSchema)

module.exports = Cursos