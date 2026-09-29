import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

const columns = [
  { key: 'user', label: 'Athlete' },
  { key: 'team', label: 'Team' },
  { key: 'points', label: 'Points' },
]

function Leaderboard() {
  return (
    <CollectionPage
      title="Leaderboard"
      description="Celebrate the athletes earning points this season."
      endpoint={endpoint}
      columns={columns}
      emptyMessage="The leaderboard is waiting for its first results."
    />
  )
}

export default Leaderboard
