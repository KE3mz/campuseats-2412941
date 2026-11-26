import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { useVendor } from '../hooks/useVendor.js'
import { useAuth } from '../hooks/useAuth.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import MenuList from '../components/MenuList.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'

function VendorPage() {
  const { id } = useParams()
  const { user } = useAuth()

  const storageKey = user ? `ce-category-${user.uid}` : null
  const [savedCategory, setSavedCategory] = useLocalStorage(storageKey, 'All')
  const [activeCategory, setActiveCategory] = useState(savedCategory)

  useEffect(() => {
    setActiveCategory(savedCategory)
  }, [id, savedCategory])

  const { vendor, menu, categories, menuLoading, loading, error } = useVendor(
    id,
    activeCategory,
  )

  // Revert to 'All' if this vendor doesn't have the saved category
  useEffect(() => {
    if (!menuLoading && activeCategory !== 'All' && menu.length === 0) {
      setActiveCategory('All')
    }
  }, [menuLoading, activeCategory, menu.length])

  function handleSelectCategory(category) {
    setActiveCategory(category)
    setSavedCategory(category)
  }

  if (loading) return <Loading />
  if (error)
    return (
      <ErrorMessage
        message={error}
        onRetry={() => window.location.reload()}
      />
    )
  if (!vendor)
    return (
      <p>
        Vendor not found. <Link to="/">Back to vendors</Link>
      </p>
    )

  const items = menu.map((item) => ({ ...item, vendorName: vendor.name }))

  return (
    <section>
      <p>
        <Link to="/">← All vendors</Link>
      </p>
      <h2 className="section-title">{vendor.name}</h2>
      <p className="muted">
        {vendor.location} · {vendor.openHours}
      </p>
      <MenuList
        items={items}
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
      />
    </section>
  )
}

export default VendorPage