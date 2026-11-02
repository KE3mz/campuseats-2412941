import { useState } from 'react'
import MenuItemCard from './MenuItemCard.jsx'
import { useCart } from '../hooks/useCart.js'

function MenuList({ items }) {
    // 1. Consume addToCart directly from Context
    const { addToCart } = useCart()

    // 2. Track the currently active category
    const [activeCategory, setActiveCategory] = useState('All')

    if (!items || items.length === 0) {
        return <p className="muted">No items on this menu yet.</p>
    }

    // 3. Extract unique categories
    const categories = ['All', ...new Set(items.map((item) => item.category))]

    // 4. Filter items based on active category selection
    const displayedItems = activeCategory === 'All'
        ? items
        : items.filter((item) => item.category === activeCategory)

    return (
        <div className="menu-section">
            {/* Filter Buttons */}
            <div className="category-filters" style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                {categories.map((category) => (
                    <button
                        key={category}
                        type="button"
                        className={activeCategory === category ? 'btn active' : 'btn'}
                        onClick={() => setActiveCategory(category)}
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
                        onAdd={addToCart} 
                    />
                ))}
            </div>
        </div>
    )
}

export default MenuList