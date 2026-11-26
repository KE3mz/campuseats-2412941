import MenuItemCard from './MenuItemCard.jsx'
import { useCart } from '../hooks/useCart.js'
import { useAuth } from '../hooks/useAuth.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

function MenuList({ items }) {
  const { addToCart } = useCart()
  const { user } = useAuth()

  // Signed-in: 'ce-category-<uid>'; Guest: null (defaults to 'All', does not save)
  const key = user ? `ce-category-${user.uid}` : null
  const [savedCategory, setSavedCategory] = useLocalStorage(key, 'All')

  if (!items || items.length === 0) {
    return <p className="muted">No items on this menu yet.</p>
  }

  const categories = ['All', ...new Set(items.map((item) => item.category))]

  // Fall back to 'All' if the user's saved category isn't on this vendor's menu
  const activeCategory = categories.includes(savedCategory) ? savedCategory : 'All'

  const displayedItems =
    activeCategory === 'All'
      ? items
      : items.filter((item) => item.category === activeCategory)

  return (
    <div className="menu-section">
      <div className="category-filters">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={activeCategory === category ? 'btn active' : 'btn'}
            onClick={() => setSavedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

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