function MenuItemCard() {
 const item = {
 name: 'Nasi Kerabu Ayam',
 description: 'Rice soaked in butterfly-pea flowers, fried chicken, vegetables',
 price: 6.5,
 available: true,
 }
 return (
 <article className="card menu-card">
 <div className="thumb" aria-hidden="true">{item.name.charAt(0)}</div>
 <h3>{item.name}</h3>
 <p className="muted">{item.description}</p>
 <p className="price">RM {item.price.toFixed(2)}</p>
 <button className="btn" disabled={!item.available}>
 {item.available ? 'Add to cart' : 'Sold out'}
 </button>
 </article>
 )
}
export default MenuItemCard
