import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

const columns = [
  { key: 'title', label: 'Workout' },
  { key: 'activityType', label: 'Activity' },
  { key: 'difficulty', label: 'Difficulty' },
  { key: 'durationMinutes', label: 'Duration (min)' },
  { key: 'description', label: 'Description' },
]

function Workouts() {
  return (
    <CollectionPage
      title="Workouts"
      description="Choose a workout that fits your pace and goals."
      endpoint={endpoint}
      columns={columns}
      emptyMessage="No workouts are available yet."
    />
  )
}

export default Workouts
