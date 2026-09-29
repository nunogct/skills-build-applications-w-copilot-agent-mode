import { Router } from 'express'
import Team from '../models/team.js'

const router = Router()

router.get('/', async (_request, response) => {
  response.json(await Team.find().populate('members').sort({ name: 1 }))
})

router.post('/', async (request, response) => {
  response.status(201).json(await Team.create(request.body))
})

export default router