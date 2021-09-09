import express from 'express'
import controller from '../controllers/personajesController.js'

const router = express.Router()

router.get('/view', controller.viewAll)

export default router