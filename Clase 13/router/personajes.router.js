import express from 'express'
import controller from '../controller/personajes.controller.js'

const router = express.Router()

router.route('/')
.get(controller.findAll)
.post(controller.create)

router.route('/:id')
.get(controller.findById)


export default router