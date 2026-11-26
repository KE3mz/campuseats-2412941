import { useEffect, useState } from 'react'
import { subscribeToVendor, subscribeToMenu } from '../services/vendors.js'

export function useVendor(vendorId, category = 'All') {
  const [vendor, setVendor] = useState(undefined)
  const [menu, setMenu] = useState([])
  const [categories, setCategories] = useState(['All'])
  const [menuLoading, setMenuLoading] = useState(true)
  const [error, setError] = useState(null)

  // 1. Live vendor details + full category list for this vendor
  useEffect(() => {
    const stopVendor = subscribeToVendor(vendorId, setVendor, (err) =>
      setError(err.message),
    )
    const stopAllMenu = subscribeToMenu(
      vendorId,
      'All',
      (allItems) => {
        setCategories([
          'All',
          ...new Set(allItems.map((item) => item.category).filter(Boolean)),
        ])
      },
      (err) => setError(err.message),
    )

    return () => {
      stopVendor()
      stopAllMenu()
    }
  }, [vendorId])

  // 2. Live filtered menu query: uses where('category', '==', category) when category !== 'All'
  useEffect(() => {
    setMenuLoading(true)
    const stopMenu = subscribeToMenu(
      vendorId,
      category,
      (data) => {
        setMenu(data)
        setMenuLoading(false)
      },
      (err) => {
        setError(err.message)
        setMenuLoading(false)
      },
    )

    return () => stopMenu()
  }, [vendorId, category])

  return {
    vendor,
    menu,
    categories,
    menuLoading,
    loading: vendor === undefined && !error,
    error,
  }
}