import { useState } from 'react'
import MenuItemCard from './MenuItemCard.jsx'

function MenuList({ items, onAdd }) {
    // 1. Track the currently active category
    const [activeCategory, setActiveCategory] = useState('All')


    // DEBUGGING: This will print your items to the browser console so you can see them!
    console.log("Menu Items Data:", items);
    if (items.length === 0) {
        return <p className="muted">No items on this menu yet.</p>
    }

    // 2. Extract unique categories (e.g., ['All', 'Food', 'Drink'])
    const categories = ['All', ...new Set(items.map((item) => item.category))]

    // 3. Filter items based on what is selected
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
                    <MenuItemCard key={item.id} item={item} onAdd={onAdd} />
                ))}
            </div>
        </div>
    )
}

export default MenuList