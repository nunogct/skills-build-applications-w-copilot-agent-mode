import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

const columns = [
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
  { key: 'age', label: 'Age' },
  { key: 'fitnessLevel', label: 'Fitness level' },
]

function Users() {
  return (
    <CollectionPage
      title="Athletes"
      description="Meet the people building healthy habits with Octofit."
      endpoint={endpoint}
      columns={columns}
      emptyMessage="No athletes are registered yet."
    />
  )
}

export default Users
