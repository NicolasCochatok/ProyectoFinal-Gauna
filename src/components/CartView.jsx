import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function CartView() {
  const { cart, totalQty, totalPrice, removeItem, clearCart } = useCart()

  if (cart.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Tu carrito está vacío</h2>
        <Link to="/">Volver a la tienda</Link>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem' }}>
      <h1>Carrito</h1>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cart.map(p => (
          <li
            key={p.id}
            style={{
              padding: '0.5rem 0',
              borderBottom: '1px solid #ddd',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>
              {p.title} x {p.qty} — ${p.price * p.qty}
            </span>
            <button onClick={() => removeItem(p.id)}>Quitar</button>
          </li>
        ))}
      </ul>

      <p>Total unidades: {totalQty}</p>
      <p>
        <strong>Total: ${totalPrice}</strong>
      </p>

      <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
        <button onClick={clearCart}>Vaciar carrito</button>
        <Link to="/checkout">Finalizar compra</Link>
      </div>
    </div>
  )
}

export default CartView
