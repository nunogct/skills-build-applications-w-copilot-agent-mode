import { Router } from 'express'
import User from '../models/user.js'

const router = Router()

router.get('/', async (_request, response) => {
  response.json(await User.find().sort({ username: 1 }))
})

router.post('/', async (request, response) => {
  response.status(201).json(await User.create(request.body))
})

export default router