import { useParams, Link } from 'react-router'
import { useVendors } from '../hooks/useVendors'
import MenuList from '../components/MenuList'
import {Loading} from '../components/Status'
import {ErrorMessage} from '../components/Status'

export default function VendorPage() {
  const { id } = useParams()
  const { vendors, loading, error, reload } = useVendors()

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={reload} />

  // Match vendor ID (comparing as strings or numbers)
  const vendor = vendors.find((v) => String(v.id) === String(id))

  if (!vendor) {
    return (
      <section>
        <h2 className="section-title">Vendor not found</h2>
        <p className="muted">
          There is no vendor called “{id}”. <Link to="/">Back to vendors</Link>
        </p>
      </section>
    )
  }

  return (
    <section>
      <p><Link to="/">← All vendors</Link></p>
      <h2 className="section-title">{vendor.name}</h2>
      <p className="muted">{vendor.location} · {vendor.openHours}</p>
      <MenuList items={vendor.menu} />
    </section>
  )
}