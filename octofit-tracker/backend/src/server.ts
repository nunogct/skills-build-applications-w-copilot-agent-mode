import express from 'express'
import db, { connectDatabase } from './config/database.js'
import activitiesRouter from './routes/activities.js'
import leaderboardRouter from './routes/leaderboard.js'
import teamsRouter from './routes/teams.js'
import usersRouter from './routes/users.js'
import workoutsRouter from './routes/workouts.js'

const app = express()
const port = Number(process.env.PORT ?? 8000)
const codespaceName = process.env.CODESPACE_NAME
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

app.use(express.json())
app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    database: db.readyState === 1 ? 'connected' : 'connecting',
    baseUrl,
  })
})

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  if (error instanceof Error && error.name === 'ValidationError') {
    response.status(400).json({ error: error.message })
    return
  }

  console.error(error)
  response.status(500).json({ error: 'Internal server error' })
})

async function start() {
  try {
    await connectDatabase()
    app.listen(port, '0.0.0.0', () => {
      console.log(`OctoFit API listening at ${baseUrl} on port ${port}`)
    })
  } catch (error) {
    console.error('Error connecting to octofit_db:', error)
    process.exitCode = 1
  }
}

void start()