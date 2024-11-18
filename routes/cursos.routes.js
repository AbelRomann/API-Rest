const express = require('express')
const Cursos = require('../models/cursoss')

const router = new express.Router()

router.post('/api/cursos', async (req, res) => {
    const curso = new Cursos(req.body)

    try {
        await curso.save()
        res.status(201).send(curso)
    }
    catch(error) {
        res.status(400).send(error)
    }
})

router.get('/cursos', async (req, res) => {
    let cursos = []
    try  {
        cursos = await Cursos.find({})
        res.send(cursos)
    }

    catch(error)
    {
        res.status(500).send({msg: 'error, revisa ese trapo'})
    }


})

// Actualizar un curso existente por ID
router.patch('/api/cursos/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['titulo', 'lenguaje', 'tema', 'vistas', 'nivel']
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Actualización no permitida' })
    }

    try {
        const curso = await Cursos.findById(req.params.id)

        if (!curso) {
            return res.status(404).send({ error: 'Curso no encontrado' })
        }

        updates.forEach(update => curso[update] = req.body[update])
        await curso.save()
        res.send(curso)
    } catch (error) {
        res.status(400).send(error)
    }
})

// Eliminar un curso existente por ID
router.delete('/api/cursos/:id', async (req, res) => {
    try {
        const curso = await Cursos.findByIdAndDelete(req.params.id)

        if (!curso) {
            return res.status(404).send({ error: 'Curso no encontrado' })
        }

        res.send({ message: 'Curso eliminado con éxito', curso })
    } catch (error) {
        res.status(500).send({ error: 'Error al eliminar el curso' })
    }
})

module.exports = router