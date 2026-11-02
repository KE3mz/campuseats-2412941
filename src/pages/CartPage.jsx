import { useNavigate } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import CartItem from '../components/CartItem'
import CheckoutForm from '../components/CheckoutForm'

export default function CartPage() {
  const { cart, total, changeQty, removeFromCart, placeOrder } = useCart()
  const navigate = useNavigate()

  const handleCheckout = (details) => {
    placeOrder(details)
    navigate('/orders')
  }

  if (cart.length === 0) {
    return (
      <div className="card text-center" style={{ padding: '24px' }}>
        <p className="muted">Your cart is empty. Please pick something from a menu first.</p>
      </div>
    )
  }

  return (
    <div className="cart-layout">
      <div className="card">
        <h2>Your Cart</h2>
        <ul className="cart-list" style={{ listStyle: 'none', padding: 0 }}>
          {cart.map((line) => (
            <CartItem
              key={line.item.id}
              line={line}
              onChangeQty={changeQty}
              onRemove={removeFromCart}
            />
          ))}
        </ul>
        <h3 className="cart-total" style={{ marginTop: '16px' }}>
          Total: RM {total.toFixed(2)}
        </h3>
      </div>

      <CheckoutForm onPlaceOrder={handleCheckout} />
    </div>
  )
}