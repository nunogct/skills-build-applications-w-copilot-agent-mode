import { Router } from 'express'
import Workout from '../models/workout.js'

const router = Router()

router.get('/', async (request, response) => {
  const filter = request.query.difficulty ? { difficulty: request.query.difficulty } : {}
  response.json(await Workout.find(filter).sort({ difficulty: 1, title: 1 }))
})

router.post('/', async (request, response) => {
  response.status(201).json(await Workout.create(request.body))
})

export default router