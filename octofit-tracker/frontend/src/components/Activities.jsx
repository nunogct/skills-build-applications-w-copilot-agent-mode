import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

const columns = [
  { key: 'user', label: 'Athlete' },
  { key: 'activityType', label: 'Activity' },
  { key: 'durationMinutes', label: 'Duration (min)' },
  { key: 'distanceKm', label: 'Distance (km)' },
  { key: 'points', label: 'Points' },
  {
    key: 'recordedAt',
    label: 'Recorded',
    format: (value) => value ? new Date(value).toLocaleDateString() : '-',
  },
]

function Activities() {
  return (
    <CollectionPage
      title="Activities"
      description="A log of the effort that moves your team forward."
      endpoint={endpoint}
      columns={columns}
      emptyMessage="No activities have been logged yet."
    />
  )
}

export default Activities
