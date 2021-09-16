import express from 'express'
import controller from '../controllers/personajesController.js'

const router = express.Router()

router.get('/view', controller.viewAll)

// esto es solo new, por que el rooter principal esta puesto en /personajes
router.get('/new', controller.formNuevoPersonaje)
router.post('/new', controller.crearPersonaje)

export default router