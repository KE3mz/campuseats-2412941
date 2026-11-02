import { useVendors } from '../hooks/useVendors'
import VendorCard from '../components/VendorCard'
import {Loading} from '../components/Status'
import {ErrorMessage} from '../components/Status'

export default function HomePage() {
  const { vendors, loading, error, reload } = useVendors()

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={reload} />

  return (
    <section>
      <h2 className="section-title">Choose a vendor</h2>
      <div className="vendor-grid">
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </section>
  )
}