import { Router } from 'express'
import Activity from '../models/activity.js'

const router = Router()

router.get('/', async (_request, response) => {
  response.json(await Activity.find().populate('user').sort({ recordedAt: -1 }))
})

router.post('/', async (request, response) => {
  response.status(201).json(await Activity.create(request.body))
})

export default router