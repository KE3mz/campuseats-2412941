import MenuItemCard from './MenuItemCard.jsx'
import { useCart } from '../hooks/useCart.js'

function MenuList({ items, categories = ['All'], activeCategory = 'All', onSelectCategory }) {
  const { addToCart } = useCart()

  return (
    <div className="menu-section">
      <div className="category-filters">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={activeCategory === category ? 'btn active' : 'btn'}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {!items || items.length === 0 ? (
        <p className="muted">No items in this category.</p>
      ) : (
        <div className="grid">
          {items.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              onAdd={() => addToCart(item)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default MenuList