import { Router } from 'express'
import LeaderboardEntry from '../models/leaderboard.js'

const router = Router()

router.get('/', async (_request, response) => {
  response.json(await LeaderboardEntry.find().populate('user team').sort({ points: -1 }))
})

router.post('/', async (request, response) => {
  response.status(201).json(await LeaderboardEntry.create(request.body))
})

export default router