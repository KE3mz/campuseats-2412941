// One row in the cart. It shows data and reports clicks upward; it owns no state.
function CartItem({ line, onChangeQty, onRemove }) {
  if (!line || !line.item) return null

  const { item, qty } = line
  return (
    <li className="cart-line">
      <div>
        <p className="cart-name">{item.name}</p>
        <p className="muted">RM {item.price?.toFixed(2)} each</p>
      </div>
      <div className="qty">
        <button type="button" onClick={() => onChangeQty(item.id, -1)}>−</button>
        <span>{item.quantity}</span>
        <button type="button" onClick={() => onChangeQty(item.id, 1)}>+</button>
      </div>
      <p className="line-total">
        RM {((item.price || 0) * (qty || 0)).toFixed(2)}
      </p>
      <button 
        type="button" 
        className="link danger" 
        onClick={() => onRemove(item.id)}
      >
        Remove
      </button>
    </li>
  )
}

export default CartItem