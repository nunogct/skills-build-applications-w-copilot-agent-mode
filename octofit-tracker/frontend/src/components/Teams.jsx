import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

const columns = [
  { key: 'name', label: 'Team' },
  { key: 'members', label: 'Members' },
  { key: 'points', label: 'Points' },
]

function Teams() {
  return (
    <CollectionPage
      title="Teams"
      description="Find your crew and build momentum together."
      endpoint={endpoint}
      columns={columns}
      emptyMessage="No teams have been created yet."
    />
  )
}

export default Teams
