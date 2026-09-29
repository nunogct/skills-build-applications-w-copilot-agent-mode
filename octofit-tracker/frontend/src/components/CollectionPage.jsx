import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function displayValue(value) {
  if (value === null || value === undefined || value === '') return '-'
  if (Array.isArray(value)) return value.length ? value.map(displayValue).join(', ') : '-'
  if (typeof value === 'object') {
    return displayValue(value.username ?? value.name ?? value.title ?? value.email ?? value._id)
  }
  return String(value)
}

function CollectionPage({ title, description, endpoint, columns, emptyMessage }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadCollection() {
      setLoading(true)
      setError('')

      try {
        setItems(await fetchCollection(endpoint, { signal: controller.signal }))
      } catch (loadError) {
        if (!(loadError instanceof Error && loadError.name === 'AbortError')) {
          setError(loadError instanceof Error ? loadError.message : 'Unable to load data')
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadCollection()
    return () => controller.abort()
  }, [endpoint])

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">OCTOFIT TRACKER</p>
          <h1>{title}</h1>
          <p className="text-secondary mb-0">{description}</p>
        </div>
        <span className="badge rounded-pill text-bg-light border">
          {loading ? 'Loading' : `${items.length} ${items.length === 1 ? 'record' : 'records'}`}
        </span>
      </div>

      {error && <div className="alert alert-danger" role="alert">Could not load {title.toLowerCase()}: {error}</div>}
      {loading && <p className="text-secondary" role="status">Loading {title.toLowerCase()}…</p>}
      {!loading && !error && items.length === 0 && (
        <div className="empty-state">{emptyMessage}</div>
      )}
      {!loading && !error && items.length > 0 && (
        <div className="table-responsive data-card">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr>
                {columns.map((column) => <th key={column.key} scope="col">{column.label}</th>)}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id ?? item.id ?? index}>
                  {columns.map((column) => (
                    <td key={column.key}>
                      {column.format
                        ? column.format(item[column.key])
                        : displayValue(item[column.key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default CollectionPage
