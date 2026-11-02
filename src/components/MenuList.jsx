import { useSearchParams } from 'react-router-dom'
import MenuItemCard from './MenuItemCard.jsx'
import { useCart } from '../hooks/useCart.js'

function MenuList({ items }) {
  const { addToCart } = useCart()

  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('cat') || 'All'

  if (!items || items.length === 0) {
    return <p className="muted">No items on this menu yet.</p>
  }

  const categories = ['All', ...new Set(items.map((item) => item.category))]

  // 4. Update the URL when a user clicks a category button
  const handleCategorySelect = (category) => {
    if (category === 'All') {
      // Remove ?cat= query param when 'All' is selected
      searchParams.delete('cat')
      setSearchParams(searchParams)
    } else {
      // Set ?cat=CategoryName in the URL
      setSearchParams({ cat: category })
    }
  }

  // 5. Filter items based on active URL category
  const displayedItems =
    activeCategory === 'All'
      ? items
      : items.filter((item) => item.category === activeCategory)

  return (
    <div className="menu-section">
      {/* Category Filter Buttons */}
      <div className="category-filters">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={activeCategory === category ? 'btn active' : 'btn'}
            onClick={() => handleCategorySelect(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Filtered Grid of Items */}
      <div className="grid">
        {displayedItems.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            onAdd={() => addToCart(item)}
          />
        ))}
      </div>
    </div>
  )
}

export default MenuList